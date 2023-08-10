// To parse this JSON data, do
//
//     final userModel = userModelFromJson(jsonString);

import 'dart:convert';

UserModel userModelFromJson(String str) => UserModel.fromJson(json.decode(str));

String userModelToJson(UserModel data) => json.encode(data.toJson());

class UserModel {
    int stuId;
    String stuFname;
    String stuLname;
    String stuEmail;
    String stuPassword;
    DateTime stuDob;

    UserModel({
        required this.stuId,
        required this.stuFname,
        required this.stuLname,
        required this.stuEmail,
        required this.stuPassword,
        required this.stuDob,
    });

    factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        stuId: json["stu_id"],
        stuFname: json["stu_fname"],
        stuLname: json["stu_lname"],
        stuEmail: json["stu_email"],
        stuPassword: json["stu_password"],
        stuDob: DateTime.parse(json["stu_dob"]),
    );

    Map<String, dynamic> toJson() => {
        "stu_id": stuId,
        "stu_fname": stuFname,
        "stu_lname": stuLname,
        "stu_email": stuEmail,
        "stu_password": stuPassword,
        "stu_dob": stuDob.toIso8601String(),
    };
}
