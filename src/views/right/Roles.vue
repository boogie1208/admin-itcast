<template>
    <div class="roles">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/user' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">角色管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-button type="primary" plain>添加角色</el-button>
        <el-table
            :data="roleList"
            border
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="scope">
                <el-row v-for="firstChild in scope.row.children" :key="firstChild.id">
                    <el-col :span="4">
                        <el-tag closable @close="deletRoles(scope.row,firstChild.id)">{{firstChild.authName}}</el-tag>
                        <i class="el-icon-d-arrow-right" v-if="firstChild.children.length !==0"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="secondChild in firstChild.children" :key="secondChild.id">
                            <el-col :span="4">
                                <el-tag closable type="success"  @close="deletRoles(scope.row,secondChild.id)">{{secondChild.authName}}</el-tag>
                                <i class="el-icon-d-arrow-right" v-if="secondChild.children.length !==0"></i>
                            </el-col>
                            <el-col :span="20">       
                                <el-tag 
                                    closable 
                                    type="warning"
                                    v-for="thirdChild in secondChild.children" :key="thirdChild.id"
                                    @close="deletRoles(scope.row,thirdChild.id)">
                                    {{thirdChild.authName}}
                                </el-tag>   
                            </el-col>
                        </el-row>
                        
                    </el-col>
                </el-row>
                <el-row v-if="scope.row.children.length==0">
                    <el-col :span="24">该角色没有权限,请前往分配</el-col>
                </el-row>
            </template>
            </el-table-column>
            <el-table-column
            label="角色名称"
            prop="roleName">
            </el-table-column>
            <el-table-column
            label="描述"
            prop="roleDesc">
            </el-table-column>
            <el-table-column
            label="操作">
             <template slot-scope="scope">
                    <el-button  
                        type="primary" 
                        icon="el-icon-edit" 
                        plain 
                        
                        ></el-button>   
                    <el-button 
                        type="danger" 
                        icon="el-icon-delete" 
                        plain
                        @click="deletDialog(scope.row)"></el-button>                 
                    <el-button 
                        type="success" 
                        icon="el-icon-check" 
                        plain
                        title="角色权限"
                        @click="showDialog(scope.row)"></el-button>                 
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">  
            <div class="tree-content">
                 <el-tree
                    :data="rightList"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expand-all= "true"
                    :default-checked-keys="selectedRightsList"
                    :props="defaultProps">
                </el-tree>
            </div>
           
         
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitGrand">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getRoleList,deleteRolesRight,getRightList,granRolesRight } from '@/api'
export default {
    data() {
      return {
        roleList: [],
        dialogFormVisible:false,
        rightList: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        selectedRightsList:[],
        roleId:'',
      }
    },
    created(){
       this.initRoles()
    },
    methods:{
        initRoles(){
            getRoleList().then(res=>{
                if(res.meta.status===200){
                    this.roleList = res.data
                }
            })
        },
        deletRoles(row,rightId){
            let params = {
                roleId:row.id,
                rightId:rightId
            }
            deleteRolesRight(params).then(res=>{
                if(res.meta.status===200){
                    this.$message({
                        type:'success',
                        message:res.meta.msg
                    });
                    row.children = res.data;
                }
            })
        },
        showDialog(row){
            this.roleId = row.id;
            this.dialogFormVisible = true;
            this.selectedRightsList = []
            getRightList({type:"tree"}).then(res=>{
                this.rightList = res.data
                let index = [];
                let flag = row.children;
                flag.forEach(item1=>{
                    if(item1.children && item1.children.length!==0){
                        item1.children.forEach(item2=>{
                            this.selectedRightsList.push(item2.id)
                            if(item2.children && item2.children.length!==0){
                                item2.children.forEach(item3=>{
                                    this.selectedRightsList.push(item3.id);
                                })
                            }
                        });
                    }
                    
                })
            })
        },
        submitGrand(row){
            this.dialogFormVisible = false;
            let rids = this.$refs.tree.getCheckedKeys().join(',');
            granRolesRight(this.roleId,rids).then(res=>{
                if(res.meta.status===200){
                    this.$message({
                        type:"success",
                        message:res.meta.msg
                    })
                    // this.initRoles(); 这个更新有问题，可能存在接口的问题
                }
               
            })
        }
        
    }  
}
</script>
<style>
    .el-row{
        height: 100%;
    }
    .el-row div{
        height: 100%;
    }
    .tree-content{
        height: 300px;
        overflow: auto;
    }
</style>

