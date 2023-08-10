// To parse this JSON data, do
//
//     final certificatesModel = certificatesModelFromJson(jsonString);

import 'dart:convert';

List<CertificatesModel> certificatesModelFromJson(String str) => List<CertificatesModel>.from(json.decode(str).map((x) => CertificatesModel.fromJson(x)));

String certificatesModelToJson(List<CertificatesModel> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class CertificatesModel {
    int certiId;
    DateTime fromDate;
    DateTime toDate;
    String resume;

    CertificatesModel({
        required this.certiId,
        required this.fromDate,
        required this.toDate,
        required this.resume,
    });

    factory CertificatesModel.fromJson(Map<String, dynamic> json) => CertificatesModel(
        certiId: json["certi_id"],
        fromDate: DateTime.parse(json["from_date"]),
        toDate: DateTime.parse(json["to_date"]),
        resume: json["resume"],
    );

    Map<String, dynamic> toJson() => {
        "certi_id": certiId,
        "from_date": fromDate.toIso8601String(),
        "to_date": toDate.toIso8601String(),
        "resume": resume,
    };
}
