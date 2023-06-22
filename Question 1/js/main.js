var res='';
function reg(){
        const registrationUrl = 'http://104.211.219.98/train/register';
        const registrationData = {
        "companyName": "Train Central",
       "ownerName": "Ram",
        "rollNo": "1",
        "ownerEmail": "ram@abc.edu",
        "accessCode": "FKDLjg"
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', registrationUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(registrationData));
        xhr.onreadystatechange= function()
        {
            if(xhr.readyState==4 && xhr.status==200)
            {
                localStorage.setItem('userid',xhr.responseText);
                res=xhr.responseText;

            }
        }

        //Authoriscation Token
        var credentials=JSON.parse(res.toString);
        const Authoriscation1 = 'http://104.211.219.98/train/register';
        const details1 = {
        "companyName": "Train Central",
        "ownerName": "Ram",
        "rollNo": "1",
        "ownerEmail": "ram@abc.edu",
        "clientID":credentials['clientID'],
        "clientSecret":credentials['clientSecret']
        };

        const auth = new XMLHttpRequest();
        auth.open('POST', registrationUrl, true);
        auth.setRequestHeader('Content-Type', 'application/json');
        auth.send(JSON.stringify(registrationData));
        auth.onreadystatechange= function()
        {
            if(auth.readyState==4 && xhr.status==200)
            {
                localStorage.setItem('auth',auth.responseText);
            }
        }
    setInterval(fetchdata(),5000);   //Updating Train Details
}
function fetchdata()
{
    const fetchreq=new XMLHttpRequest();
    fetchreq=open('GET','http://104.211.219.98/train/trains',true);
    fetchreq.setRequestHeader('Content-type','application/json');
    fetchreq.send();
    fetchreq.onreadystatechange= function(){
        if(fetchreq.readyState==4 && fetchreq.status==200)
        {
            localStorage.setItem('Trains',fetchreq.responseText);
        }
    }
}

var train=localStorage.getItem('Trains');
var parent=document.getElementsByClassName('mainlayout');
var table=document.createElement('table');
var tr=document.createElement('tr');

    var td1=document.createElement('td');
    td1.innerHTML="TrainName";
    tr.appendChild(td1);

    var td2=document.createElement('td');
    td1.innerHTML="TrainNumber";
    tr.appendChild(td2);

    var td2=document.createElement('td');
    td3.innerHTML="Departure Time";
    tr.appendChild(td3);

    var td1=document.createElement('td');
    td4.innerHTML="Sleeper / AC";
    tr.appendChild(td4);

    var td1=document.createElement('td');
    td5.innerHTML="Price";
    tr.appendChild(td5);

    var td1=document.createElement('td');
    td6.innerHTML="DdelayedBy";
    tr.appendChild(td6);
    
    table.appendChild(tr);

for(var i in train)
{
    if(train[i][departureTime].Hours==0 && train[i][departureTime].Minutes<30 && train[i][departureTime].Seconds==0)   //Deparute less than 30 min
    {
        var tr=document.createElement('tr');

        var td1=document.createElement('td');
        td1.innerHTML=train[i].trainName;
        tr.appendChild(td1);

        var td2=document.createElement('td');
        td1.innerHTML=train[i].trainNumber;
        tr.appendChild(td2);

        var td2=document.createElement('td');
        td3.innerHTML=train[i][departureTime].Hours+":"+train[i][departureTime].Minutes+":"+train[i][departureTime].Seconds;
        tr.appendChild(td3);

        var td1=document.createElement('td');
        td4.innerHTML="Sleeper :"+train[i][seatsAvailable].sleeper+"  AC:"+train[i][seatsAvailable].AC;
        tr.appendChild(td4);

        var td1=document.createElement('td');
        td5.innerHTML=train[i].price;
        tr.appendChild(td5);

        var td1=document.createElement('td');
        td6.innerHTML=train[i].delayedBy;
        tr.appendChild(td6);
        
        table.appendChild(tr);
    }
}
parent.appendChild(table);