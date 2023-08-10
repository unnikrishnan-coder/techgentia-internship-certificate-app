import 'package:http/http.dart' as http;
import 'dart:convert';

getData() async {
  const String url = "https://random-data-api.com/api/v2/appliances?size=3";
  final uri = Uri.parse(url);
  final List<dynamic> response = await http.get(uri).then((value){
    return jsonDecode(value.body);
  });
  return response;
}
