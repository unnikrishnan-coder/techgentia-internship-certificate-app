import 'package:flutter/material.dart';
import 'package:mobile/main.dart';

class CustomInput extends StatelessWidget {
  CustomInput({super.key,required this.value,required this.label});
  final String value;
  final String label;
  TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    controller.text = value;
    return Padding(
      padding: const EdgeInsets.all(30.0),
      child: TextField(
        controller: controller,
        readOnly: true,
        decoration: InputDecoration(
          label: Text(label),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20.0),
            borderSide: const BorderSide(
              color: Colors.blue,
              width: 10.0,
            ),
          ),
        ),
      ),
    );
  }
}


class CertificateTile extends StatelessWidget {
  const CertificateTile({super.key, required this.id, required this.from, required this.to});
  final String id;
  final String from;
  final String to;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Card(
          elevation: 20,
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("Id:$id"),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("Start Date:$from"),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("End Date:$to"),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: ElevatedButton(onPressed: (){
                  Navigator.of(context).push(MaterialPageRoute(builder: (BuildContext context){
                    return const Pdf();
                  }));
                }, child: const Text("view")),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class ApplicationsTile extends StatelessWidget {
  const ApplicationsTile({super.key, required this.id, required this.from, required this.to, required this.status});
  final String id;
  final String from;
  final String to;
  final String status;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Card(
          elevation: 20,
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("Id:$id"),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("Start Date:$from"),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("End Date:$to"),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text("Status:$status"),
              )
            ],
          ),
        ),
      ),
    );
  }
}