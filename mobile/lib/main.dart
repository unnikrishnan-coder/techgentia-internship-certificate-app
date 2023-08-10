import 'package:flutter/material.dart';
import 'package:mobile/custom.dart';
import 'package:mobile/models/applications_model.dart';
import 'package:mobile/models/certificates_model.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import 'package:mobile/api_service.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/models/certificate_model.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Login(),
    );
  }
}

class DashBorad extends StatefulWidget {
  const DashBorad({super.key});

  @override
  State<DashBorad> createState() => _DashBoradState();
}

class _DashBoradState extends State<DashBorad> {
  String buttonName = "Submit";
  int bottomIndex = 0;
  Widget integrityPage = const Integrity();
  Widget page = const Integrity();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        drawer: Drawer(
          backgroundColor: Colors.white,
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10.0),
                child: SizedBox(
                  width: 400.0,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xff7c2bdb)),
                    onPressed: () {
                      Navigator.of(context).push(
                          MaterialPageRoute(builder: (BuildContext context) {
                        return const Login();
                      }));
                    },
                    child: const Text("Logout"),
                  ),
                ),
              ),
            ],
          ),
        ),
        appBar: AppBar(
          backgroundColor: const Color(0xff7c2bdb),
          title: const Text("Internship Certificate Portal"),
        ),
        body: page,
        bottomNavigationBar: BottomNavigationBar(
          unselectedItemColor: Colors.white,
          backgroundColor: const Color(0xff7c2bdb),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home, color: Colors.white),
              label: "Home",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.school, color: Colors.white),
              label: "Certificates",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.list, color: Colors.white),
              label: "Applications",
            )
          ],
          currentIndex: bottomIndex,
          onTap: (int index) {
            setState(() {
              bottomIndex = index;
              if (bottomIndex == 0) {
                page = const Integrity();
              } else if (bottomIndex == 1) {
                page = const Certificates();
              } else {
                page = const Applications();
              }
            });
          },
        ),
      ),
    );
  }
}

class Integrity extends StatefulWidget {
  const Integrity({super.key});

  @override
  State<Integrity> createState() => _IntegrityState();
}

class _IntegrityState extends State<Integrity> {
  Future<CertificateModel>? certificate;
  TextEditingController controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    getCertificateData("");
  }

  void getCertificateData(String referenceID) {
    certificate = ApiService().validate(referenceID);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage("images/bg.jpg"), fit: BoxFit.cover)),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            controller: controller,
            cursorColor: Colors.blue,
            style: const TextStyle(color: Colors.black),
            decoration: const InputDecoration(
                hintStyle: TextStyle(color: Colors.blue),
                hintText: "Enter the certificate reference number"),
          ),
        ),
        ElevatedButton(
          onPressed: () {
            getCertificateData(controller.text);
            if (certificate != null) {
              certificate?.then((value) {
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (BuildContext context) {
                  return IntegrityDetails(data: value, validated: true);
                }));
              }).catchError((onError) {
                print(onError.toString());
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (BuildContext context) {
                  return const IntegrityDetails(validated: false);
                }));
              });
            }
          },
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(Colors.blue.shade900),
            foregroundColor: MaterialStateProperty.all(Colors.white),
          ),
          child: const Text("Submit"),
        )
      ]),
    );
  }
}

class Certificates extends StatefulWidget {
  const Certificates({super.key});

  @override
  State<Certificates> createState() => _CertificatesState();
}

class _CertificatesState extends State<Certificates> {
  @override
  Widget build(BuildContext context) {

    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage("images/bg.jpg"), fit: BoxFit.cover)),
      child: FutureBuilder<List<CertificatesModel>>(
        future: ApiService().certificates("1"),
        builder: (context,snapshot){
          if(snapshot.hasData){
            var certificates = snapshot.data;
            return ListView.builder(
              itemCount: certificates?.length,
              itemBuilder: (context,index)=>(
              CertificateTile(
                from: certificates![index].fromDate.toString(),
                to: certificates[index].toDate.toString(),
                id: certificates[index].certiId.toString(),
                )
            ));
          } else if (snapshot.hasError) {
              // The Future is completed with an error.
              var error = snapshot.error;
              return Text(error.toString());
            } else {
              // The Future is not yet completed.
              return const Center(child: CircularProgressIndicator());
            }
        },
        )
    );
  }
}

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController userController = TextEditingController();
  TextEditingController passController = TextEditingController();
  Future<UserModel>? _userModel;

  @override
  void initState() {
    super.initState();
    _userModel = ApiService().login("", "");
  }

  void _getData() {
    _userModel = ApiService()
        .login(userController.value.text, passController.value.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("images/bg.jpg"),
              fit: BoxFit.fitHeight,
            ),
          ),
          width: double.infinity,
          // color: Colors.blue,
          height: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                "Welcome Back",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 50.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20.0, 20.0, 20.0, 10.0),
                child: SizedBox(
                  width: 330.0,
                  child: TextField(
                    controller: userController,
                    cursorColor: Colors.blue,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                        label: Text(
                          "Username",
                          style: TextStyle(color: Colors.white),
                        ),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                            borderSide: BorderSide(
                              color: Colors.white,
                              width: 2.0,
                            )),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                          color: Colors.white,
                          width: 2.0,
                        )),
                        hintStyle: TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255)),
                        hintText: "Enter username"),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 20.0),
                child: SizedBox(
                  width: 330.0,
                  child: TextField(
                    controller: passController,
                    cursorColor: Colors.blue,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                        label: Text(
                          "Password",
                          style: TextStyle(color: Colors.white),
                        ),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                            borderSide: BorderSide(
                              color: Colors.white,
                              width: 2.0,
                            )),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                          color: Colors.white,
                          width: 2.0,
                        )),
                        hintStyle: TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255)),
                        hintText: "Enter password"),
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  _getData();
                  if (_userModel == null) {
                    print("error");
                  } else {
                    _userModel?.then((value) {
                      Navigator.of(context).push(
                          MaterialPageRoute(builder: (BuildContext context) {
                        return const DashBorad();
                      }));
                    }).catchError((onError) {
                      print(onError);
                    });
                  }
                },
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.black,
                    minimumSize: const Size(330.0, 50.0),
                    padding: const EdgeInsets.fromLTRB(30.0, 0, 30.0, 0)),
                child: const Text(
                  "Login",
                  style: TextStyle(fontSize: 17.0),
                ),
              ),
              Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                          MaterialPageRoute(builder: (BuildContext context) {
                        return const Signup();
                      }));
                    },
                    child: const Text("Don't have an account,Sign Up",
                        style: TextStyle(color: Colors.white, fontSize: 17.0)),
                  )),
            ],
          ),
        ),
      ),
    );
  }
}

class Pdf extends StatelessWidget {
  const Pdf({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff7c2bdb),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: SfPdfViewer.asset("documents/certificate.pdf"),
      ),
    );
  }
}

class Applications extends StatefulWidget {
  const Applications({super.key});

  @override
  State<Applications> createState() => _ApplicationsState();
}

class _ApplicationsState extends State<Applications> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage("images/bg.jpg"), fit: BoxFit.cover)),
      child: FutureBuilder<List<ApplicationsModel>>(
        future: ApiService().applications("1"),
        builder: (context,snapshot){
          if(snapshot.hasData){
            var applications = snapshot.data;
            return ListView.builder(
              itemCount: applications?.length,
              itemBuilder: (context,index)=>(
              ApplicationsTile(
                from: applications![index].fromDate.toString(),
                to: applications[index].toDate.toString(),
                id: applications[index].appliId.toString(),
                status: applications[index].statusCheck.toString(),
                )
            ));
          } else if (snapshot.hasError) {
              // The Future is completed with an error.
              var error = snapshot.error;
              return Text(error.toString());
            } else {
              // The Future is not yet completed.
              return const Center(child: CircularProgressIndicator());
            }
        },
      )
    );
  }
}

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Container(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage("images/bg.jpg"),
              fit: BoxFit.fitHeight,
            ),
          ),
          width: double.infinity,
          // color: Colors.blue,
          height: double.infinity,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                "Create an account",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 40.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(20.0, 20.0, 20.0, 10.0),
                child: SizedBox(
                  width: 330.0,
                  child: TextField(
                    cursorColor: Colors.blue,
                    style: TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                        label: Text(
                          "Email",
                          style: TextStyle(color: Colors.white),
                        ),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                            borderSide: BorderSide(
                              color: Colors.white,
                              width: 2.0,
                            )),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                          color: Colors.white,
                          width: 2.0,
                        )),
                        hintStyle: TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255)),
                        hintText: "Enter email"),
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(20.0, 20.0, 20.0, 10.0),
                child: SizedBox(
                  width: 330.0,
                  child: TextField(
                    cursorColor: Colors.blue,
                    style: TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                        label: Text(
                          "Password",
                          style: TextStyle(color: Colors.white),
                        ),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                            borderSide: BorderSide(
                              color: Colors.white,
                              width: 2.0,
                            )),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                          color: Colors.white,
                          width: 2.0,
                        )),
                        hintStyle: TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255)),
                        hintText: "Enter password"),
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 20.0),
                child: SizedBox(
                  width: 330.0,
                  child: TextField(
                    cursorColor: Colors.blue,
                    style: TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                        label: Text(
                          "Confirm Password",
                          style: TextStyle(color: Colors.white),
                        ),
                        enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                            borderSide: BorderSide(
                              color: Colors.white,
                              width: 2.0,
                            )),
                        focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                          color: Colors.white,
                          width: 2.0,
                        )),
                        hintStyle: TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255)),
                        hintText: "Confirm password"),
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context)
                      .push(MaterialPageRoute(builder: (BuildContext context) {
                    return const Login();
                  }));
                },
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20)),
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.black,
                    minimumSize: const Size(330.0, 50.0),
                    padding: const EdgeInsets.fromLTRB(30.0, 0, 30.0, 0)),
                child: const Text(
                  "Sign Up",
                  style: TextStyle(fontSize: 17.0),
                ),
              ),
              Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.of(context).push(
                          MaterialPageRoute(builder: (BuildContext context) {
                        return const Login();
                      }));
                    },
                    child: const Text("Already have an account,Login",
                        style: TextStyle(color: Colors.white, fontSize: 17.0)),
                  )),
            ],
          ),
        ),
      ),
    );
  }
}

class IntegrityDetails extends StatelessWidget {
  const IntegrityDetails({super.key, this.data, required this.validated});

  final CertificateModel? data;

  final bool validated;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xff7c2bdb),
      ),
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
            image: DecorationImage(
                image: AssetImage("images/bg.jpg"), fit: BoxFit.cover)),
        child: Center(
          child: validated == true
              ? Details(data: data)
              : Center(
                  child: Container(
                    width: double.infinity,
                    height: 50.0,
                    color: Colors.white,
                    child: const Padding(
                      padding: EdgeInsets.fromLTRB(50.0,0,50.0,0),
                      child: Text(
                        "Fake certificate",
                        style: TextStyle(
                            fontSize: 30.0,
                            color: Color.fromARGB(255, 255, 0, 0),
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ),
        ),
      ),
    );
  }
}

class Details extends StatelessWidget {
  const Details({super.key, this.data});
  final CertificateModel? data;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        CustomInput(value: data!.appliCollege, label: "Institution"),
        CustomInput(value: data!.appliGender, label: "Gender"),
        CustomInput(value: data!.stuEmail, label: "Email"),
        CustomInput(value: data!.stuFname, label: "First Name"),
        CustomInput(value: data!.stuLname, label: "Last Name"),
        Container(
          width: double.infinity,
          height: 50,
          decoration: const BoxDecoration(color: Colors.white),
          child: const Padding(
            padding: EdgeInsets.fromLTRB(50.0, 5, 50.0, 10),
            child: Text(
              "This is a valid certificate",
              style: TextStyle(
                  fontSize: 25.0, color: Color.fromARGB(255, 123, 92, 226)),
            ),
          ),
        ),
      ],
    );
  }
}
