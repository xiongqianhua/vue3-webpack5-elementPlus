/*
 * @Author: qianhua.xiong
 */
import {postJson,post,get,upload} from './axios';
const systemApi = {
    addStation:postJson('/add/sation'),
    getStationList:postJson('/get/station'),
    addBot:postJson('/add/bot'),
    addBase:postJson('/add/base'),
}
const uploadApi = {
    uploadFile: upload + '/upload'
}
export {
    systemApi ,
    uploadApi
}