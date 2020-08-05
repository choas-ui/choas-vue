
/**
 * @name markListDataIdentify 标记数据标识
 * @param data 数据源
 * @param startId 起始节点
 * */
export const markListDataIdentify = (data, startId = '')=> {
    if(Object.prototype.toString.call(data) !== '[object Array]'){
        return;
    }
    data.forEach((item, index) => {
        item._c_tree_parent_id = startId;
        item._c_tree_self_id = startId ? startId + '-' + index : +index + '';
        if ((item.children || []).length) {
            markListDataIdentify(item.children, item._c_tree_self_id)
        }
    });
    return  data;
};
