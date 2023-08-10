import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:mobile/constants.dart';
import 'package:mobile/models/applications_model.dart';
import 'package:mobile/models/certificates_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/models/certificate_model.dart';

class ApiService {
  Future<UserModel>? login(String username, String password) async {
    try {
      var url = Uri.parse(APIEndpoints.baseUrl + APIEndpoints.login);
      var response = await http
          .post(url, body: {"username": username, "password": password});
      if (response.statusCode == 200) {
        UserModel _model = userModelFromJson(response.body);
        return _model;
      } else {
        return Future.error(Exception(jsonDecode(response.body)));
      }
    } catch (e) {
      log(e.toString());
      return Future.error(Exception(e));
    }
  }

  Future<CertificateModel>? validate(String referenceID) async {
    try {
      var url = Uri.parse(APIEndpoints.baseUrl + APIEndpoints.validate);
      var response = await http.post(url, body: {"referenceID": referenceID});
      if (response.statusCode == 200) {
        CertificateModel certificate = certificateModelFromJson(response.body);
        return certificate;
      } else {
        return Future.error(Exception(jsonDecode(response.body)));
      }
    } catch (e) {
      return Future.error(Exception(e));
    }
  }

  Future<List<CertificatesModel>>? certificates(String uid) async{
    try {
      var url = Uri.parse("${APIEndpoints.baseUrl}${APIEndpoints.certificates}?uid=$uid");
      var response = await http.get(url);
      if (response.statusCode == 200) {
        List<CertificatesModel> certificates = certificatesModelFromJson(response.body);
        return certificates;
      } else {
        return Future.error(Exception(jsonDecode(response.body)));
      }
    } catch (e) {
      return Future.error(Exception(e));
    }
  }

  Future<List<ApplicationsModel>>? applications(String uid) async{
    try {
      var url = Uri.parse("${APIEndpoints.baseUrl}${APIEndpoints.applications}?uid=$uid");
      var response = await http.get(url);
      if (response.statusCode == 200) {
        List<ApplicationsModel> applications = applicationsModelFromJson(response.body);
        return applications;
      } else {
        return Future.error(Exception(jsonDecode(response.body)));
      }
    } catch (e) {
      return Future.error(Exception(e));
    }
  }
}
