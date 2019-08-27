import {mapGetters} from 'vuex'
export default{
  created(){
    this.SubMenus = this.levelThreeMenuList[this.$route.path.slice(1)] || []
  },
  computed:{
    ...mapGetters(['levelThreeMenuList']),
  }
}