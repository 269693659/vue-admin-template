<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item)&&(!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <!-- <svg-icon :icon-class="item.meta.icon || ''"/> -->
        <i :class="onlyOneChild.meta.icon||''"></i>
        <span>{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </template>
      <!-- <el-menu-item :index="resolvePath(item.path)" v-if="!item.children">
        <i :class="item.meta.icon||''"></i>
        <span>{{item.meta.title}}</span>
      </el-menu-item>
      <el-menu-item :index="resolvePath(item.children[0].path)" v-else-if="item.children.length==1 && !item.children[0].children">
        <i :class="item.children[0].meta.icon||''"></i>
        <span slot="title">{{item.children[0].meta.title}}</span>
      </el-menu-item> -->
      <el-submenu v-else :index="item.path">
        <template slot="title">
          <!-- <svg-icon :icon-class="item.meta.icon || ''"/> -->
          <i :class="item.meta.icon||''"></i>
          <span>{{item.meta.title}}</span>
        </template>
        <sidebar-item v-for="route in item.children" :key="route.path" :item="route" :base-path="resolvePath(route.path)" />
      </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name:'sidebar-item',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      onlyOneChild:null
    }
  },
  created(){
    console.log(this.basePath);
  },
  methods:{
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    hasOneShowingChild(children=[],parent){
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if(showingChildren.length==1){
        return true
      }
      if(showingChildren.length==0){
        this.onlyOneChild={...parent,path:'',noShowingChildren:true}
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>