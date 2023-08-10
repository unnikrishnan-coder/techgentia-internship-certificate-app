// To parse this JSON data, do
//
//     final applicationsModel = applicationsModelFromJson(jsonString);

import 'dart:convert';

List<ApplicationsModel> applicationsModelFromJson(String str) => List<ApplicationsModel>.from(json.decode(str).map((x) => ApplicationsModel.fromJson(x)));

String applicationsModelToJson(List<ApplicationsModel> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class ApplicationsModel {
    int appliId;
    int hrUserid;
    int stuId;
    int appliPhone;
    int appliAge;
    String appliGender;
    String appliCollege;
    String appliQualification;
    DateTime fromDate;
    DateTime toDate;
    String resume;
    String statusCheck;

    ApplicationsModel({
        required this.appliId,
        required this.hrUserid,
        required this.stuId,
        required this.appliPhone,
        required this.appliAge,
        required this.appliGender,
        required this.appliCollege,
        required this.appliQualification,
        required this.fromDate,
        required this.toDate,
        required this.resume,
        required this.statusCheck,
    });

    factory ApplicationsModel.fromJson(Map<String, dynamic> json) => ApplicationsModel(
        appliId: json["appli_id"],
        hrUserid: json["hr_userid"],
        stuId: json["stu_id"],
        appliPhone: json["appli_phone"],
        appliAge: json["appli_age"],
        appliGender: json["appli_gender"],
        appliCollege: json["appli_college"],
        appliQualification: json["appli_qualification"],
        fromDate: DateTime.parse(json["from_date"]),
        toDate: DateTime.parse(json["to_date"]),
        resume: json["resume"],
        statusCheck: json["status_check"],
    );

    Map<String, dynamic> toJson() => {
        "appli_id": appliId,
        "hr_userid": hrUserid,
        "stu_id": stuId,
        "appli_phone": appliPhone,
        "appli_age": appliAge,
        "appli_gender": appliGender,
        "appli_college": appliCollege,
        "appli_qualification": appliQualification,
        "from_date": fromDate.toIso8601String(),
        "to_date": toDate.toIso8601String(),
        "resume": resume,
        "status_check": statusCheck,
    };
}
