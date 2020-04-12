int led[3] = {15, 4, 17};
int gnd[3] = {2, 16, 5};

void setup() {
  // put your setup code here, to run once:
  for (int i=0;i<3;i++){
    pinMode(led[i], OUTPUT);
    digitalWrite(led[i], 1);

    pinMode(gnd[i], OUTPUT);
    digitalWrite(gnd[i], 0);
  }
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  for(int k=0;k<3;k++){
    digitalWrite(led[k], 1);
    delay(333);
    digitalWrite(led[k], 0);
    delay(131);
  }
}
