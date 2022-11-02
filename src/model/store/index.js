import { defineStore } from 'pinia' //引入

const useStore = defineStore('user', 
{ 
  state: () => {
    return {
      status:0,
      value1: "",
      value2: "",
      value3: "",
      filelist: [],
      value4: "",
      value5: "",
      message: "",
      user_receiveplace: "",
      user_name: "",
      user_phone: "",
    }
  },
  actions:{
    clear(){
      this.value1 = ""
      this.value2 = ""
      this.value3 = ""
      this.filelist = []
      this.value4 = ""
      this.value5 = ""
      this.message = ""
      this.user_receiveplace = ""
      this.user_name = ""
      this.user_phone = ""
    }
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      { storage: localStorage, paths: ['status'] }
    ]
  }
}
 )

export  {useStore}  //导出
