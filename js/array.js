

Array.prototype.switch = function(val){
    return this[(this.indexOf(val) + 1) % this.length];
}
Array.prototype.switch = function(val){
    return this[(this.indexOf(val) + 1) % this.length];
}
//el.className = ["class1","class2","class3"].switch(el.className);


// 判断数组是否有此元素
Array.prototype.has = function(val){
    var i;
    for(i = 0; i < this.length; i++){
        if(this[i] == val){
            return true;
        }
    }
    return false;
}

Array.prototype.contains = function(val){
    var i;
    for(i = 0; i < this.length; i++){
        if(this[i] == val){
            return true;
        }
    }
    return false;
}

// 按值删除数组元素
Array.prototype.remove = function(val){
    var i, j;
    for(i = 0; i < this.length; i++){
        if(this[i] == val){
            for(j = i; j < this.length - 1; j++){
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

// 按索引删除数组元素
Array.prototype.removeAt = function(index){
    var i;
    if(index < this.length){
        for(i = index; i < this.length - 1; i++){
            this[i] = this[i + 1];
        }
        this.length = this.length - 1;
    }
}

Array.prototype.del = function(n){
    return this.slice(0,n).concat(this.slice(n+1,this.length));
}

/*
 * each是一个集合迭代函数，它接受一个函数作为参数和一组可选的参数<br/>
 * 这个迭代函数依次将集合的每一个元素和可选参数用函数进行计算，并将计算得的结果集返回
 * 
 * 示例：
 * 
 * <script>
 *  var a = [1,2,3,4].each(function(x){return x > 2 ? x : null});
 *  var b = [1,2,3,4].each(function(x){return x < 0 ? x : null});
 *  alert(a);
 *  alert(b);
 * </script>
 *
 * @param {Function} fn 进行迭代判定的函数
 * @param more ... 零个或多个可选的用户自定义参数
 * @returns {Array} 结果集，如果没有结果，返回空集
 */
Array.prototype.each = function(fn){
    fn = fn || Function.K;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < this.length; i++){
        var res = fn.apply(this,[this[i],i].concat(args));
        if(res != null) a.push(res);
    }
    return a;
}

/*
 * 得到一个数组不重复的元素集合，唯一化一个数组
 *
 * @returns {Array} 由不重复元素构成的数组
 */
Array.prototype.uniquelize = function(){
    var ra = new Array();
    for(var i = 0; i < this.length; i ++){
        if(!ra.contains(this[i])){
            ra.push(this[i]);
        }
    }
    return ra;
}

/*
 * 求两个集合的补集
 *
 * @param {Array} a 集合A
 * @param {Array} b 集合B
 * @returns {Array} 两个集合的补集
 */
Array.complement = function(a, b){
    return Array.minus(Array.union(a, b),Array.intersect(a, b));
}

/*
 * 求两个集合的交集
 *
 * @param {Array} a 集合A
 * @param {Array} b 集合B
 * @returns {Array} 两个集合的交集
 */
Array.intersect = function(a, b){
    return a.uniquelize().each(function(o){return b.contains(o) ? o : null});
}

/*
 * 求两个集合的差集
 *
 * @param {Array} a 集合A
 * @param {Array} b 集合B
 * @returns {Array} 两个集合的差集
 */
Array.minus = function(a, b){
    return a.uniquelize().each(function(o){return b.contains(o) ? null : o});
}

/*
 * 求两个集合的并集
 *
 * @param {Array} a 集合A
 * @param {Array} b 集合B
 * @returns {Array} 两个集合的并集
 */
Array.union = function(a, b){
    return a.concat(b).uniquelize();
}

/*
 * 求集合的所有子集
 * 示例：
 *
 * var a = ['a','b','c','d','e','f','g'];
 * document.write('{'+a.getAllSubSets().join("},{")+'}');
 * 
 * @returns {Array}
 */

Array.prototype.getAllSubSets = function(){
    if(this.length == 0) return [];
    var ret = this.slice(1).getAllSubSets();
    for(var i = ret.length - 1; i >= 0; i--){
        ret.push([this[0]].concat(ret[i]));
     }
    ret.push([this[0]]);
    return ret;  
}

/*
 * 组合算法
 * 示例：
 *
 * var a = ['a','b','c','d','e','f','g'];
 * document.write('<ol><li>'+combination(a,4).join('</li><li>')+'</li></ol>');
 *
 * @param {Array} a 集合A
 * @param {int} r 组合个数
 * @param {Array} s 
 * @returns {Array} 
 */
Array.prototype.combination = function(a, r, s){
    var ret = [];
    s = s || [];
    if(r == 0) {return [s];}
    for(var i = 0; i <= a.length - r; i++){
       ret = ret.concat(arguments.callee(a.slice(i+1), r-1, s.slice(0).concat(a[i])));
    }
    return ret;
}

// 数组第一次出现指定元素值的位置
Array.prototype.indexOf = function(val){
    for (var i=0; i<this.length; i++){
        if (this[i] == val) return i;
    }
    return -1;
}


/*
 * 常见数组排序算法
 *
 */

// 交换元素
Array.prototype.swap = function(i, j){
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
}

/*
Array.prototype.swap = function(i, j){
    this[i] += this[j];
    this[j] = this[i]-this[j];
    this[i] -= this[j];
}
Array.prototype.swap = function(i, j){
    this[i] ^= this[j];
    this[j] ^= this[i];
    this[i] ^= this[j];
}
*/

// 冒泡排序
Array.prototype.bubbleSort = function(){
    for (var i = this.length - 1; i > 0; --i){
        for (var j = 0; j < i; ++j){
            if (this[j] > this[j + 1]) this.swap(j, j + 1);
        }
    }
}

// 选择排序
Array.prototype.selectionSort = function(){
    for (var i = 0; i < this.length; ++i){
        var index = i;
        for (var j = i + 1; j < this.length; ++j){
            if (this[j] < this[index]) index = j;
        }
        this.swap(i, index);
    }
}

// 插入排序
Array.prototype.insertionSort = function(){
    for (var i = 1; i < this.length; ++i){
        var j = i, value = this[i];
        while (j > 0 && this[j - 1] > value){
            this[j] = this[j - 1];
            --j;
        }
        this[j] = value;
    }
}

// 谢尔排序
Array.prototype.shellSort = function(){
    for (var step = this.length >> 1; step > 0; step >>= 1){
        for (var i = 0; i < step; ++i){
            for (var j = i + step; j < this.length; j += step){
                var k = j, value = this[j];
                while (k >= step && this[k - step] > value){
                    this[k] = this[k - step];
                    k -= step;
                }
                this[k] = value;
            }
        }
    }
}

// 快速排序(递归)
Array.prototype.quickSort = function(s, e){
    if (s == null) s = 0;
    if (e == null) e = this.length - 1;
    if (s >= e) return;
    this.swap((s + e) >> 1, e);
    var index = s - 1;
    for (var i = s; i <= e; ++i){
        if (this[i] <= this[e]) this.swap(i, ++index);
    }
    this.quickSort(s, index - 1);
    this.quickSort(index + 1, e);
}

// 快速排序(堆栈)
Array.prototype.stackQuickSort = function(){
    var stack = [0, this.length - 1];
    while (stack.length > 0){
        var e = stack.pop(), s = stack.pop();
        if (s >= e) continue;
        this.swap((s + e) >> 1, e);
        var index = s - 1;
        for (var i = s; i <= e; ++i){
            if (this[i] <= this[e]) this.swap(i, ++index);
        }
        stack.push(s, index - 1, index + 1, e);
    }
}

// 归并排序
Array.prototype.mergeSort = function(s, e, b){
    if (s == null) s = 0;
    if (e == null) e = this.length - 1;
    if (b == null) b = new Array(this.length);
    if (s >= e) return;
    var m = (s + e) >> 1;
    this.mergeSort(s, m, b);
    this.mergeSort(m + 1, e, b);
    for (var i = s, j = s, k = m + 1; i <= e; ++i){
        b[i] = this[(k > e || j <= m && this[j] < this[k]) ? j++ : k++];
    }
    for (var i = s; i <= e; ++i) this[i] = b[i];
}

// 堆排序
Array.prototype.heapSort = function(){
    for (var i = 1; i < this.length; ++i){
        for (var j = i, k = (j - 1) >> 1; k >= 0; j = k, k = (k - 1) >> 1){
            if (this[k] >= this[j]) break;
            this.swap(j, k);
        }
    }
    for (var i = this.length - 1; i > 0; --i){
        this.swap(0, i);
        for (var j = 0, k = (j + 1) << 1; k <= i; j = k, k = (k + 1) << 1){
            if (k == i || this[k] < this[k - 1]) --k;
            if (this[k] <= this[j]) break;
            this.swap(j, k);
        }
    }
}

