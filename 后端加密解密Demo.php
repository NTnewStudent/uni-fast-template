<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * 加密解密demo
 * 前端必须将app.$u.http.config.encryption = true
 * 前端和后端的app.$u.http.config.solt = 'ak#2@12345' 为秘钥请自定义约定
 * 请保持数据格式一致
 * 请拷贝authcode方法到中间件或者构造器
 * Class IndexController
 * @package App\Http\Controllers
 */
class IndexController extends Controller
{
    /**
     * PHP加解密测试
     * @param Request $request
     * 如果开启了加密模式前端必须接受加密的字符串
     */

    //      测试数据
    //     * var formdata = {
    //     * code: 200,
    //     * data: [1, 2, 4, 6, 7],
    //     * ids: '1,2,3,5,76,9',
    //     * obj: {
    //     * name: 'abc'
    //     * }
    //
    public function index(Request $request)
    {
        $key = 'ak#2@12345';  //加密密钥
        //从data里面获取值以后在进行key获取 data永远是一个字符串
        $str = $request->input('data');

        //解密获取数据
        $data = $this->authcode(($str), 'DECODE', $key, 0);
        $enter =  json_decode(urldecode($data));

        //建议吧以上步骤放在构造函数里或者中间件

        //获取数据实例
        /**
         *
         *  $enter =  json_decode(urldecode($data));
         *  $code = $enter->code;
         *  $data = $enter->data[0] or $data[1]
         *  $ids  = $enter->ids
         *  return $this->success('加密数据测试',$enter->ids);
         */

        //返回又加密
        return $this->success('加密数据测试',$this->authcode($data, 'ENCODE', $key, 0));
    }

    public function success($title = '操作成功', $data = array())
    {
        return response()->json(array(
            'message' => $title,
            'errors' => '',
            'data' => $data,
            'code' => 1,
            'status_code' => 200,
            'debug' => '',
        ), 200);
    }

    public function error($title = '操作失败', $data = array(), $status_code = 400, $code = 0)
    {
        return response()->json(array(
            'message' => $title,
            'errors' => '',
            'data' => $data,
            'code' => $code,
            'status_code' => $status_code,
            'debug' => '',
        ), 200);
    }

    public function rsuccess($message = '操作成功', $data = array(), $code = '')
    {
        return array('code' => 1, 'message' => $message, 'data' => $data);
    }

    public function rerror($message = '操作失败', $data = array(), $error_code = '')
    {
        return array('code' => 0, 'message' => $message, 'data' => $data, 'error_code' => $error_code);
    }


    private function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
    {
        $ckey_length = 4;
        $key = md5($key);
        $keya = md5(substr($key, 0, 16));
        $keyb = md5(substr($key, 16, 16));
        $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length) : substr(md5(microtime()), -$ckey_length)) : '';
        $cryptkey = $keya . md5($keya . $keyc);
        $key_length = strlen($cryptkey);
        $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0) . substr(md5($string . $keyb), 0, 16) . $string;
        $string_length = strlen($string);
        $result = '';
        $box = range(0, 255);
        $rndkey = array();
        for ($i = 0; $i <= 255; $i++) {
            $rndkey[$i] = ord($cryptkey[$i % $key_length]);
        }
        for ($j = $i = 0; $i < 256; $i++) {
            $j = ($j + $box[$i] + $rndkey[$i]) % 256;
            $tmp = $box[$i];
            $box[$i] = $box[$j];
            $box[$j] = $tmp;
        }
        for ($a = $j = $i = 0; $i < $string_length; $i++) {
            $a = ($a + 1) % 256;
            $j = ($j + $box[$a]) % 256;
            $tmp = $box[$a];
            $box[$a] = $box[$j];
            $box[$j] = $tmp;
            $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
        }
        if ($operation == 'DECODE') {
            if ((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyb), 0, 16)) {
                return substr($result, 26);
            } else {
                return '';
            }
        } else {
            return $keyc . str_replace('=', '', base64_encode($result));
        }
    }

}
