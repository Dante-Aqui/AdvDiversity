// @flow
import { LayoutActionTypes } from './constants';

import * as layoutConstants from '../../constants/layout';

const INIT_STATE = {
    layoutType: layoutConstants.LAYOUT_HORIZONTAL,
    layoutWidth: layoutConstants.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: layoutConstants.LEFT_SIDEBAR_THEME_DARK,
    leftSideBarType: layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
    showRightSidebar: false,
};

const Layout = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LayoutActionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };
        case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_THEME:
            return {
                ...state,
                leftSideBarTheme: action.payload,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload,
            };
        case LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: !state.showRightSidebar,
            };
        case LayoutActionTypes.SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: true,
            };
        case LayoutActionTypes.HIDE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: false,
            };
        default:
            return state;
    }
};

export default Layout;
