import React from "react"
import DailyIframe  from '@daily-co/daily-js';
import * as  dailyService from "../../services/dailyService"
import debug from 'sabio-debug';


const _logger = debug.extend('Daily');

class Daily extends React.Component {
    constructor(props) {
        super(props);
        this.iframeRef = React.createRef();
        this.state={
            url: null
        }
        
    }
    
    
    componentDidMount() {
        let daily = DailyIframe.wrap(this.iframeRef.current, 
            {
                iframeStyle: { 
                    position: 'fixed',
                    border: '1px solid black',
                    width: '375px',
                    height: '450px',
                    right: '1em',
                    bottom: '1em',
                    
                  },
                
                url: 'https://advancing-diversity.daily.co/advancing-diversity' }
            ) 
        daily.join()
    }
    
    render() {
        const dailyRoom = () =>{
            _logger('dailyRoomClicked',);
            dailyService.getDailyRoom().then(onRoomSuccess).catch(onRoomError)
        
        }
        const onRoomSuccess = (response) => {
            _logger('room success', {response})
            
            if(response?.item?.url){
                _logger('state Fired', response)
                this.setState((prevState) => ({
                    ...prevState,
                    url: response.item.url
                }))
            }else{
                _logger('setState Failed', response)
            }

        }
        
        const onRoomError = (error) => {
            _logger('Error', {error})}
        const getUrl=(e)=>{
            e.preventDefault();
            dailyRoom();
        }
        return (
            <React.Fragment>
           <div className='row'>
                <div className='col-2'>
                    <button onClick={getUrl} className="btn btn-primary">Click for url</button>
                   
                </div>
                <div className="text">{this.state.url}</div>
           </div>
                <div className="row" style={{  height: '1000px'}}>
                    
                        <iframe
                            className="video-frame"
                            title="daily chat"
                            allow="camera; microphone; fullscreen"
                           
                            ref={this.iframeRef}>
                        </iframe>
                </div>
                </React.Fragment>
        );
    }
}
export default Daily;
