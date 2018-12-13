'use strict';

const Controller = require('egg').Controller;
const fly = require('flyio');
fly.interceptors.request.use((config,promise) => {
    config.headers["Content-Type"] = "application/json; charset=UTF-8"
    return config;
});

const qs = require('querystring');


const getPostData = function(content, userId) {
    return {
        'log_id': 'KUX_KUXBOT_V1.0',
        'version': '2.0',
        'session_id': '',
        'skill_ids': ['21528'],
        'request': {
            'query': content,
            'user_id': userId
        },
        'dialog_state': {
            'contexts': {
                'SYS_REMEMBERED_SKILLS': ['21528']
            }
        }
    }
}

const getAccessToken = async function() {
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': 'voDsDr7F0CpQzCFuGyCxipuD',
        'client_secret': 'l9v3qR006O5akQVX4t7X9PWRzokZ0caR'
    });
    let res = await fly.get("https://aip.baidubce.com/oauth/2.0/token?" + param);
    return res.data;
}

const getPostUrl = function(accessToken) {
    const param = qs.stringify({
        'access_token': accessToken
    });
    return 'https://aip.baidubce.com/rpc/2.0/unit/service/chat?' + param;
}

class ChatController extends Controller {
  async index() {
    const { ctx, service, config } = this;
    const userId = ctx.request.body.userId || ctx.query.userId;
    const content = ctx.request.body.content || ctx.query.content;
    if ( !config.access_token ) {
        let atRes = await getAccessToken();
        config.access_token = atRes.access_token;
    }

    if ( !userId || !content ) {
        ctx.body = {
            code: 1,
            msg: "参数错误"
        }
        return;
    }
    
    let postUrl = getPostUrl(config.access_token); 
    let res = {};

    do {
        res = await fly.post(postUrl, getPostData(content, userId));
    } while ( !res.data.result.response_list )

    ctx.body = {
        code: 0,
        action_list: res.data.result.response_list[0].action_list
    }
  }
}

module.exports = ChatController;
