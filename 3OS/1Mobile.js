搜索框 
  键盘 换行'enter' 改 搜索 
    input 放在form里,此时"换行"已变成'前往' 
    input 设置 type="search" 变成 '搜索' 
  监听键盘右下角按键事件 
    方法一: 监听'keydown',通过键码筛选, 但部分手机兼容性不好 
    document.getElementById('search').addEventListener('keydown',function (e) {
      console.log(e.keyCode);
      if(e.keyCode == 13){
        console.log("search");
      }
    })
    方法二: 将input放到form中,监听'submit'事件 
    <form action="">
      <input type="search" >
      <button type="submit" class="mui-btn mui-btn-block">搜索</button>
    </form>
    document.querySelector('form').addEventListener('submit', function(e){
      e.preventDefault(); // 阻止默认事件
      console.log("搜索");
    });






























