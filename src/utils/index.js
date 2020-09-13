import _ from 'lodash'

/**
 * @name markListDataIdentify 标记数据标识
 * @param data 数据源
 * @param startId 起始节点
 * */
export const markListDataIdentify = (data, startId = '') => {
  if (Object.prototype.toString.call(data) !== '[object Array]') {
    return;
  }
  data.forEach((item, index) => {
    item._c_tree_parent_id = startId;
    item._c_tree_self_id = startId ? startId + '-' + index : +index + '';
    if ((item.children || []).length) {
      markListDataIdentify(item.children, item._c_tree_self_id)
    }
  });
  return data;
};

/**
 * @name addZero 字符加零
 * @param value 数据源
 * */
export const addZero = (value) => {
  return value > 9 ? value + '' : '0' + value;
};

/**
 * @name findDirtyValue 递归查找对象
 * @param value 查找的对象
 * @param listData 数据源
 * @param key 键值
 * */

export const findDirtyValue = (value, listData = [], key) => {
  for (let i = 0; i < listData.length; i++) {
    if (listData[i][key] === value[key]) {
      return listData[i]
    }
    if ((listData[i].children || []).length) {
      findDirtyValue(value, listData[i].children, key);
    }
  }
};

/**
 * @name markIdentifyIfNotHave 标记数据当他没有被标记时
 * @param listData 数据源
 * */

export const markIdentifyIfNotHave = (listData)=>{
  let copyListData;
  if(listData[0]&&listData[0]._c_tree_self_id){
    copyListData = _.cloneDeep(listData);
  }else{
    copyListData = markListDataIdentify(_.cloneDeep(listData));
  }
  return copyListData
};

/**
 * @name removeDirtyKey 移除脏数据
 * @param value 数据源
 * @param keys 数据源
 * @return pureCopyValue
 * */

export const removeDirtyKey = (value,keys) => {
  const pureCopyValue = _.cloneDeep(value);
  pureCopyValue.forEach(item => {
    keys.forEach(key=>{
      delete item[key];
    });
    delete item._c_tree_parent_id;
    delete item._c_tree_self_id;
    delete item.checked;
    delete item.halfChecked;
    delete item.children;
    delete item.expand;
  });
  return pureCopyValue;
};

/**
 * @name syncTreeListData 同步数据
 * @param changeParentsParams 内部函数向上递归父元素
 * @param changeChildrenParams 内部函数向下递归子元素
 * @param selectedData 初始选中值
 * @param valueKey 对比的键值
 * @param multiple 是否多选
 * @param dirtySelectedData 同步数据
 * */
export const syncTreeListData =(changeParentsParams,changeChildrenParams, selectedData,valueKey,multiple, dirtySelectedData) =>{
  if (Object.prototype.toString.call(changeChildrenParams) !== '[object Array]') {
    return;
  }
  if (Object.prototype.toString.call(selectedData) !== '[object Array]') {
    return;
  }
  changeChildrenParams.forEach(item => {
    const index = selectedData.findIndex(selected => selected[valueKey] === item[valueKey]);
    if (index > -1) {
      // 移除选中副本 减少遍历次数
      selectedData.splice(index, 1);
      item.checked = true;
      delete item.halfChecked;
      // 修改当前值
      const itemInListData = _.cloneDeepWith(item, (v, k) => {
        // 不复制子元素
        if (k !== 'children') {
          return v
        }
      });

      dirtySelectedData.push(itemInListData);
      if (multiple) {
        // 向上修改父类
        changeParentNodeStatus(changeParentsParams, item._c_tree_parent_id,dirtySelectedData);
        // 向下修改子类
        changeChildrenNodeStatus(item, item.checked,dirtySelectedData);
      }
    }
    if (selectedData.length) {
      syncTreeListData(changeParentsParams, item.children || [], selectedData, valueKey, multiple, dirtySelectedData);
    }
  })
};

/**
 * @name changeChildrenNodeStatus 修改子节点
 * @param data 内部函数向上递归父元素
 * @param checked 选中属性
 * @param dirtySelectedData 脏数据
 * */

export const changeChildrenNodeStatus = (data, checked,dirtySelectedData) =>{
  (data.children || []).forEach(item => {
    delete item.halfChecked;
    item.checked = checked;
    if(checked){
      const itemInListData = _.cloneDeepWith(item, (v, k) => {
        // 不复制子元素
        if (k !== 'children') {
          return v
        }
      });
      if(itemInListData){
        dirtySelectedData.push(itemInListData);
      }
    }
    changeChildrenNodeStatus(item, checked,dirtySelectedData)
  })
};

/**
 * @name changeChildrenNodeStatus 向上修改父节点
 * @param lisData
 * @param parentPath 父节点信息值  lodash
 * @param dirtySelectedData 脏数据
 * @param deep 是否递归
 * */

export const changeParentNodeStatus = (lisData, parentPath, dirtySelectedData,deep = true) =>{
  const parentValue = _.get(lisData, parentPath.split('-').join('.children.'), null);
  if (parentValue) {
    if (parentValue.children.every(item => !item.checked && !item.halfChecked)) {
      delete parentValue.checked;
      delete parentValue.halfChecked;
    } else if (parentValue.children.every(item => item.checked)) {
      delete parentValue.halfChecked;
      parentValue.checked = true;
    } else {
      delete parentValue.checked;
      parentValue.halfChecked = true;
    }
    if(parentValue.checked){
      const itemInListData = _.cloneDeepWith(parentValue, (v, k) => {
        // 不复制子元素
        if (k !== 'children') {
          return v
        }
      });
      if(itemInListData){
        dirtySelectedData.push(itemInListData);
      }
    }
    if (deep) {
      changeParentNodeStatus(lisData, parentValue._c_tree_parent_id, dirtySelectedData,deep)
    }
  }
};

/**
 * @name createSingleIcon 向上修改父节点
 * @param data slotsData
 * @param h $createElement
 * @param obj 追加属性
 * @param args 追加参数
 * */

export const createSingleIcon=(data,h,obj= {}, args)=>{
  if (!data) {
    return null
  }
  const {tag, listeners = {}, propsData} = data[0].componentOptions || {};
  const {slot} = data[0].data || {};
  if (tag) {
    const bindListener = {...listeners};
    // 绑定值
    if(args){
      Object.keys(listeners).forEach(key=>{
        bindListener[key]= listeners[key].bind(null,args)
      });
    }
    return h(tag,
        {
          props: {
            ...propsData,
            ...obj.props
          },
          slot,
          ...data.data,
          on: {
            ...bindListener,
            ...obj.on
          }
        }
    );
  }
  return null
};

/**
 * @name isInArray 上否在数组中
 * @param listData 列表
 * @param value 值
 * @param key 属性
 * */
export const isInArray =(listData,value,key)=>{
  if(!key){
    return !!listData.find(list=>list===value);
  }
  return !!listData.find(list=>list[key] === value[key]);
};
