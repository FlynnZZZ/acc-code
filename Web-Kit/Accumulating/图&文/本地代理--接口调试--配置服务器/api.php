<?php 
//http://localhost/api.php?apiName=/mixc/api/v1/merchant/searchShop?mallNo=1102A001
//http://localhost/api.php?apiName=/mixc/api/v1/system/search?mallNo=1102A001

$param = $_GET['apiName'];
$url = 'http://test.mixcapp.com:8800'.$param;
$result = curlPost($url);
echo $result;

/** 
 * curl POST 
 * 
 * @param   string  url 
 * @param   array   数据 
 * @param   int     请求超时时间 
 * @param   bool    HTTPS时是否进行严格认证 
 * @return  string 
 */  
function curlPost($url, $data = array(), $timeout = 30, $CA = true){    

    $cacert = getcwd() . '/cacert.pem'; //CA根证书  
    $SSL = substr($url, 0, 8) == "https://" ? true : false;  

    $ch = curl_init();  
    curl_setopt($ch, CURLOPT_URL, $url);  
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);  
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout-2);  
    if ($SSL && $CA) {  
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);   // 只信任CA颁布的证书  
        curl_setopt($ch, CURLOPT_CAINFO, $cacert); // CA根证书（用来验证的网站证书是否是CA颁布）  
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2); // 检查证书中是否设置域名，并且是否与提供的主机名匹配  
    } else if ($SSL && !$CA) {  
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 信任任何证书  
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1); // 检查证书中是否设置域名  
    }  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:')); //避免data数据过长问题  
    curl_setopt($ch, CURLOPT_POST, true);  
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);  
    //curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data)); //data with URLEncode  

    $ret = curl_exec($ch);  
    //var_dump(curl_error($ch));  //查看报错信息  

    curl_close($ch);  
    return $ret;    
}    
?>
















