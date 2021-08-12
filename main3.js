            async function bypass() {
                document.getElementById("submit").disabled = true
                document.getElementById("success").style.display = "none";
                document.getElementById("warning").style.display = "none";
                document.getElementById("danger").style.display = "none";
                try {
                const response = await fetch('https://api.bypass.vip', {
                method: 'POST',
                body: new URLSearchParams({
                    'url': document.getElementById("encrypted_link").value,
                })
            });
            const result = await response.json();
            if(result.success == true) {
                document.getElementById("success").style.display = "block";
                document.getElementById("success").innerHTML = `<a href="${result.destination}">${result.destination}</a>`
                console.log(result);
            }
            else if (result.success == false){
                console.log(result);
                document.getElementById("warning").style.display = "block";
                document.getElementById("warning").innerHTML = result.response
            }
                }
                catch {
                    document.getElementById("danger").style.display = "block";
                    document.getElementById("danger").innerHTML = "Error contacting API"
                }
                document.getElementById("submit").disabled = false
                document.getElementById("encrypted_link").value = ''
            }
var beve = "https://bypasser.cf/vvvvvvvvvv92392323owssssssssss92";
