import Cache from '../tools/cache';

const initParam = {
    conditions: {},
    orders: [],
    pageIndex: 0,
    isFirstLoad: true,
    pageSize: 10
}
const initialState = {
    user: {},
    loading: false,
    count: 0,
    param: Object.assign({}, initParam),
    dialog: '',
    gritter: {},
    nav: [{
            name: "组建库",
            url: "",
            children: [
                { name: "全端幻灯片", url: "swiper" },
                { name: "活动转盘抽奖", url: "rotate" },
                { name: "视频播放控件", url: "video" },
                { name: "导航条", url: "nav" },
                { name: "弹窗", url: "popup" },
            ]
        },
        { name: "代码规范", url: "" }
    ],
};

const functions = {
    initState: (state, action) => {
        return {
            ...state,
            param: Object.assign({}, initParam),
            count: 0,
            url: '',
            user: Cache.get('user') || {},
            nav: Cache.get('tree') || []
        };
    },
    addLoading: (state, action) => {
        return {
            ...state,
            loading: true
        };
    },
    removeLoading: (state, action) => {
        return {
            ...state,
            loading: false
        };
    },
    addGritter: (state, action) => {
        let result = action.options;

        return {
            ...state,
            gritter: {
                text: result.text,
                position: result.position
            }
        };
    },
    removeGritter: (state, action) => {
        return {
            ...state,
            gritter: {}
        };
    },
    addDialog: (state, action) => {
        return {
            ...state,
            dialog: action.options
        };
    },
    removeDialog: (state, action) => {
        return {
            ...state,
            dialog: ''
        };
    },
    loadData: (state, action) => {
        return {
            ...state,
            count: action.result.content.count,
            data: action.result.content.list,
        };

    },
    updateState: (state, action) => {
        return {
            ...state,
            ...action.state
        }
    },

}

function reducers(state = Object.assign({}, initialState), action) {

    switch (action.type) {
        case 'initState':
            state = functions.initState(state, action);
            break;
        case 'addLoading':
            state = functions.addLoading(state, action);
            break;
        case 'removeLoading':
            state = functions.removeLoading(state, action);
            break;
        case 'addGritter':
            state = functions.addGritter(state, action);
            break;
        case 'removeGritter':
            state = functions.removeGritter(state, action);
            break;
        case 'addDialog':
            state = functions.addDialog(state, action);
            break;
        case 'removeDialog':
            state = functions.removeDialog(state, action);
            break;
        case 'loadData':
            state = functions.loadData(state, action);
            break;
        case 'updateState':
            state = functions.updateState(state, action);
            break;

        default:
    }

    return state;
}

export {
    reducers
}