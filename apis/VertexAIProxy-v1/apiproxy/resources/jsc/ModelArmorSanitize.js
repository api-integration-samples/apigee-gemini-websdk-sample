var input = JSON.parse(context.proxyRequest.content);
var maResult = JSON.parse(context.getVariable("maResponse.content"));

print(JSON.stringify(maResult));

if (maResult && maResult.sanitizationResult && maResult.sanitizationResult.filterResults) {
  // get sdp sanitized result
  var sdpResult = maResult.sanitizationResult.filterResults.sdp;
  if (sdpResult && sdpResult.sdpFilterResult && sdpResult.sdpFilterResult.deidentifyResult) {
    input.contents[0].parts[0].text = sdpResult.sdpFilterResult.deidentifyResult.data.text;
    print("Replaced original prompt with sanitzed version: " + sdpResult.sdpFilterResult.deidentifyResult.data.text);
    context.setVariable("request.content", JSON.stringify(input));
  }
}