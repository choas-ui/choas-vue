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
      console.log(listData[i])
      return listData[i]
    }
    if ((listData[i].children || []).length) {
      findDirtyValue(value, listData[i].children, key);
    }
  }
};
