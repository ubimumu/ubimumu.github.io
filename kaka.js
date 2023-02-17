<script type="e02a5b9978b988d755dc06bc-text/javascript">
            const regexlv = new RegExp('^https?:\/\/(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net|filemedia[.]net|link-hub[.]net|link-center[.]net|link-target[.]net)+');
            async function tryBypass() {
                if(regexlv.test(document.getElementById("encrypted_link").value)) {
                    document.getElementById("submit").disabled = true
                    document.getElementById("submit").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">  Loading...</span>'
                    document.getElementById("success").style.display = "none";
                    document.getElementById("warning").style.display = "none";
                    document.getElementById("danger").style.display = "none";
                    var newlv = await bypasslv(document.getElementById("encrypted_link").value);
                    console.log(newlv)
                    if(newlv.success && !newlv.destination.includes("https://linkvertise.download")) {
                        document.getElementById("success").style.display = "block";
                        document.getElementById("success").innerHTML = `<a rel="noopener noreferrer nofollow" target="_blank" href="${newlv.destination}">${newlv.destination}</a>`
                        document.getElementById("submit").disabled = false
                        document.getElementById("submit").innerHTML = 'Bypass!'
                        document.getElementById("encrypted_link").value = ''
                    } else {
                        bypass()
                    }
                } else {
                    bypass()
                }
            }
            
            async function bypass() {
                document.getElementById("submit").disabled = true
                document.getElementById("submit").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">  Loading...</span>'
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
                document.getElementById("success").innerHTML = `<a rel="noopener noreferrer nofollow" target="_blank" href="${result.destination}">${result.destination}</a>`
                console.log(result);
            }
            else if (result.success == false){
                document.getElementById("warning").style.display = "block";
                document.getElementById("warning").innerHTML = result.response
            }
                }
                catch {
                    document.getElementById("danger").style.display = "block";
                    document.getElementById("danger").innerHTML = "Error contacting API"
                }
                document.getElementById("submit").disabled = false
                document.getElementById("submit").innerHTML = 'Bypass!'
                document.getElementById("encrypted_link").value = ''
            }

            async function bypasslv(url) {

                try {
                    var link = new URL(url);
                } catch {
                    return {success: false, message: 'Invalid link'}
                }

                if(link.searchParams.get("r")) {
                    return {success: true, destination: atob(link.searchParams.get("r"))}
                }

                var userId = link.pathname.replace('/download/', '/').split('/')[1]
                var path = link.pathname.replace('/download/', '/').split('/')[2]

                try {
                    const res = await superagent.get(`https://corsproxy.io/?https://paper.ostrichesica.com/ct?id=14473`) //'https://corsproxy.io/?' + encodeURIComponent('https://paper.ostrichesica.com/ct?id=14473')
                        .set({"Content-Type": "application/json", "Accept": "application/json"})
                        .timeout({response: 10000, deadline: 15000})
                    var cq_token = res.text.split('"jsonp":"').pop().split('","req"')[0];
                } catch (err) {
                    return {success: false, message: 'Error bypassing link, please try again later'}
                }

                try {
                    const res = await superagent.get(`https://publisher.linkvertise.com/api/v1/redirect/link/static/${userId}/${path}`)
                        .set({"Content-Type": "application/json", "Accept": "application/json"})
                        .timeout({response: 10000, deadline: 15000})
                    var linkType = res.body['data']['link']['target_type'].toLowerCase() === 'url' ? 'target' : 'paste'
                    var linkId = res.body['data']['link']['id']
                    //var userToken = res.body['user_token']
                } catch (err) {
                    return {success: false, message: 'Error bypassing link, please try again later'}
                }

                try {
                    const res = await superagent.post(`https://publisher.linkvertise.com/api/v1/redirect/link/${userId}/${path}/traffic-validation`) //?X-Linkvertise-UT=${userToken}
                        .send({
                            "type": "cq",
                            "token": cq_token
                        })
                        .set({"Content-Type": "application/json", "Accept": "application/json"})
                        .timeout({response: 10000, deadline: 15000})
                    var targetToken = res.body['data']['tokens']['TARGET']

                } catch (err) {
                    return {success: false, message: 'Error bypassing link, please try again later'}
                }

                try {

                    var o = btoa(JSON.stringify({
                        "timestamp": new Date().getTime(),
                        "random": 6548307,
                        "link_id": linkId
                    }))

                    const res = await superagent.post(`https://publisher.linkvertise.com/api/v1/redirect/link/${userId}/${path}/${linkType}`) //?X-Linkvertise-UT= ${userToken}
                        .send({"serial": o, "token": targetToken})
                        .set({"Content-Type": "application/json", "Accept": "application/json"})
                        .timeout({response: 10000, deadline: 15000})
                    return res.body['data'][linkType] ? {success: true, destination: res.body['data'][linkType]} : {success: false, message: 'Error bypassing link, please try again later'}
                } catch (err) {
                    return {success: false, message: err}
                }
            }
            </script>
