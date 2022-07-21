package com.kgc.ssm.utils;

import java.io.Serializable;

public class ResultJson implements Serializable {
    private static final long serialVersionUID = -7382894519035177860L;
    private String code;
    private String msg;
    private Object data;

    //成功，不带返回数据
    public ResultJson() {
        this.code = "200";
        this.msg = "sucess";
        this.data = null;
    }
    //成功，带返回数据
    public ResultJson(Object data) {
        this.code = "200";
        this.msg = "sucess";
        this.data = data;
    }
    //不成功，没有返回数据，有信息提示
    public ResultJson(String code , String msg) {
        this.code = code;
        this.msg = msg;
        this.data = null;
    }
    //自定义
    public ResultJson(String code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResultJson{" +
                "code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                ", data=" +   +
                '}';
    }
}
