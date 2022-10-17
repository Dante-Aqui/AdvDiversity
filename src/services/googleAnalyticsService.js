import axios from 'axios';
import debug from 'sabio-debug';

const _loggerGaService = debug.extend('GaService');

const googleAnalyticsService = {
    profileId: process.env.REACT_APP_GA_PROFILE_ID,
    config: {
        method: 'POST',
        url: `${process.env.REACT_APP_API_HOST_PREFIX}/api/googleanalytics`,
        data: null,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    },
};

googleAnalyticsService.getTrafficData = (startDate, endDate) => {
    const payload = {
        profileId: googleAnalyticsService.profileId,
        metrics: ['ga:pageViews', 'ga:users', 'ga:sessions'],
        dimensions: ['ga:date'],
        startDate: startDate,
        endDate: endDate,
    };

    const config = googleAnalyticsService.config;
    config.data = payload;

    return axios(config).then((response) => {
        const data = response.data.item.rows;
        return mapData(data);
    });
};

googleAnalyticsService.getPageViewsInfo = (startDate, endDate) => {
    const payload = {
        profileId: googleAnalyticsService.profileId,
        metrics: ['ga:pageviews', 'ga:avgTimeOnPage'],
        dimensions: ['ga:pagePathLevel1'],
        startDate: startDate,
        endDate: endDate,
    };

    const config = googleAnalyticsService.config;
    config.data = payload;

    return axios(config).then((response) => {
        const rows = response.data.item.rows;

        const data = mapPagesData(rows);

        return data;
    });
};

googleAnalyticsService.getUsersInfo = (startDate, endDate) => {
    const payload = {
        profileId: googleAnalyticsService.profileId,
        metrics: ['ga:users', 'ga:newUsers'],
        dimensions: ['ga:country'],
        startDate: startDate,
        endDate: endDate,
    };

    const config = googleAnalyticsService.config;
    config.data = payload;

    return axios(config).then((response) => {
        const rows = response.data.item.rows;
        const data = mapUsersInfo(rows);

        return data;
    });
};

googleAnalyticsService.getSessionsInfo = (startDate, endDate) => {
    const payload = {
        profileId: googleAnalyticsService.profileId,
        metrics: ['ga:sessions'],
        dimensions: ['ga:browser', 'ga:deviceCategory'],
        startDate: startDate,
        endDate: endDate,
    };

    const config = googleAnalyticsService.config;
    config.data = payload;

    return axios(config).then((response) => {
        const rows = response.data.item.rows;
        const data = mapSessionsData(rows);

        return data;
    });
};

googleAnalyticsService.getMentorsProfileViews = () => {
    const today = new Date();
    const pastMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const payload = {
        profileId: googleAnalyticsService.profileId,
        metrics: ['ga:totalEvents'],
        dimensions: ['ga:eventCategory', 'ga:eventLabel'],
        startDate: pastMonth,
        endDate: today,
    };

    const config = googleAnalyticsService.config;
    config.data = payload;

    return axios(config).then((response) => {
        const rows = response.data.item.rows;

        let data = [];

        for (let row of rows) {
            if (row[0] === 'Mentor Card') {
                data.push({
                    id: Number(row[1]),
                    profileViews: Number(row[2]),
                });
            }
        }

        return data.sort((a, b) => b.profileViews - a.profileViews).slice(0, 5);
    });
};

const mapData = (data) => {
    const trafficData = {
        pageViews: {
            title: 'Page Views',
            count: [],
            total: 0,
        },
        users: {
            title: 'Users',
            count: [],
            total: 0,
        },
        sessions: {
            title: 'Sessions',
            count: [],
            total: 0,
        },
        dates: [],
    };

    for (let row of data) {
        const month = row[0].substring(4, 6);
        const day = row[0].substring(6, 8);
        const date = `${month}-${day}`;
        trafficData.dates.push(date);

        trafficData.pageViews.count.push(Number(row[1]));
        trafficData.users.count.push(Number(row[2]));
        trafficData.sessions.count.push(Number(row[3]));
    }

    trafficData.pageViews.total = trafficData.pageViews.count.reduce((a, b) => a + b, 0);
    trafficData.users.total = trafficData.users.count.reduce((a, b) => a + b, 0);
    trafficData.sessions.total = trafficData.sessions.count.reduce((a, b) => a + b, 0);

    return trafficData;
};

const mapPagesData = (rows) => {
    const data = [];

    for (let row of rows) {
        let page = {
            title: '',
            views: 0,
            avgTimeOnPage: 0,
        };

        let title = row[0].substring(1).toUpperCase();
        if (title.length > 12) {
            title = `${title.substring(0, 12)}...`;
        }
        if (title === '') {
            title = 'HOME';
        } else if (title.includes('/')) {
            page = data.find((page) => page.title.includes(title.split('/')[0]));
            if (page !== undefined) {
                page.views += Number(row[1]);
            }
        } else {
            page.title = title;
            page.views = Number(row[1]);
            page.avgTimeOnPage = Number(row[2]).toFixed(2);

            data.push(page);
        }
    }

    return data.sort((a, b) => b.views - a.views);
};

const mapUsersInfo = (rows) => {
    const data = {
        users: 0,
        newUsers: 0,
        returningUsers: 0,
        countries: [],
    };

    for (let row of rows) {
        if (!data.countries.includes(row[0])) {
            data.countries.push(row[0]);
        }
        data.users = data.users + Number(row[1]);
        data.newUsers = data.newUsers + Number(row[2]);
        _loggerGaService(data);
    }

    data.returningUsers = data.users - data.newUsers;

    return data;
};

const mapSessionsData = (rows) => {
    const data = {
        browsers: {
            names: [],
            count: [],
        },
        devices: {
            categories: ['desktop', 'mobile', 'tablet'],
            count: [0, 0, 0],
        },
    };

    for (let row of rows) {
        const browserName = row[0];
        const deviceCategory = row[1];
        const sessionsCount = Number(row[2]);

        if (!data.browsers.names.includes(browserName)) {
            data.browsers.names.push(browserName);
            data.browsers.count.push(sessionsCount);
        } else {
            const browserIndex = data.browsers.names.indexOf(browserName);
            data.browsers.count[browserIndex] += sessionsCount;
        }

        const deviceIndex = data.devices.categories.indexOf(deviceCategory);
        data.devices.count[deviceIndex] += sessionsCount;
    }

    return data;
};

export default googleAnalyticsService;
