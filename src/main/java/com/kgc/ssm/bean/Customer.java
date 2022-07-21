package com.kgc.ssm.bean;


import lombok.Data;

@Data
public class Customer {
    private Integer userId;
    private String uname;
    private String upwd;
    private Integer questionId;
    private String answer;
    private String nickName;
    private char sex;
    private String acname;
    private String idCard;
    private String email;
    private String mobile;
    private  String tel;
    private Integer qq;
}
