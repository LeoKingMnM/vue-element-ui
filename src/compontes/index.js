//这测所有组件在vue下
//封装成插件形式
import MyBread from '@/compontes/my-bread.vue'
import MyChannel from '@/compontes/my-channel.vue'
import MyImages from '@/compontes/my-images.vue'

export default {
    install(Vue){
        //前面组建名  后面组件
        Vue.component(MyBread.name,MyBread)
        Vue.component(MyChannel.name,MyChannel)
        Vue.component(MyImages.name,MyImages)
    }
}