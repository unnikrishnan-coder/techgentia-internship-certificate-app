// To parse this JSON data, do
//
//     final certificateModel = certificateModelFromJson(jsonString);

import 'dart:convert';

CertificateModel certificateModelFromJson(String str) => CertificateModel.fromJson(json.decode(str));

String certificateModelToJson(CertificateModel data) => json.encode(data.toJson());

class CertificateModel {
    String stuFname;
    String stuLname;
    String appliCollege;
    String stuEmail;
    DateTime fromDate;
    DateTime toDate;
    String appliGender;

    CertificateModel({
        required this.stuFname,
        required this.stuLname,
        required this.appliCollege,
        required this.stuEmail,
        required this.fromDate,
        required this.toDate,
        required this.appliGender,
    });

    factory CertificateModel.fromJson(Map<String, dynamic> json) => CertificateModel(
        stuFname: json["stu_fname"],
        stuLname: json["stu_lname"],
        appliCollege: json["appli_college"],
        stuEmail: json["stu_email"],
        fromDate: DateTime.parse(json["from_date"]),
        toDate: DateTime.parse(json["to_date"]),
        appliGender: json["appli_gender"],
    );

    Map<String, dynamic> toJson() => {
        "stu_fname": stuFname,
        "stu_lname": stuLname,
        "appli_college": appliCollege,
        "stu_email": stuEmail,
        "from_date": fromDate.toIso8601String(),
        "to_date": toDate.toIso8601String(),
        "appli_gender": appliGender,
    };
}
