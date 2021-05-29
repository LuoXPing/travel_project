import Vue from "vue"
import vueResource from "vue-resource"
import './src/store/index'
Vue.use(vueResource);
let baseUrl = 'http://127.0.0.1:8888/travel/'
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((request, next) => {
    //   help.showLoading = true;    //you can do something in interceptors
    //request.headers.set('TOKEN', "i am the token");//配置请求头
    next((response) => {
        if (!response) {
            //do something when response
        }
        return response;
    });
});
export default {
    get(url) {
        return new Promise((resolve, reject) => {
            Vue.http.get(
                baseUrl + url,
                { emulateJSON: true }
            )
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            Vue.http.post(
                baseUrl + url,
                params,
                //   {emulateJSON: true}
            ).then(res => {
                resolve(res)
            }).catch((err) => {
                reject(err);
            });
        });
    }
}