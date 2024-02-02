require('dotenv').config();
const axios=require('axios');
const qs=require('qs');
let token;
const baseURL=`http://localhost:${process.env.PORT||3000}`;
test('signup',async ()=>{
    const postData={
        email:'dawravvvvvv@dawra.com',
        password:'thisispassword'
    };
    const formData = qs.stringify(postData);
    
    const res=await axios.post(`${baseURL}/signup`,formData,{ validateStatus() { return true },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      } });
        if(res.data.message=='User Created')
        {
            expect(res.status).toBe(200);
            expect(res.data.token).toBeTruthy();
            token=res.data.token
            console.log(token)
        }
        else
        {
            expect(res.status).toBe(409);
            expect(res.data.token).toBeFalsy();
            console.log('here');
        }
    
})

test('login',async ()=>{
    const postDataCorrect={
        email:'dawravvvvvv@dawra.com',
        password:'thisispassword'
    };
    const postDataIncorrect={
        email:'dawravvvvvv@dawra.com',
        password:'thisissspassword'
    };
    const formDataCorrect = qs.stringify(postDataCorrect);
    const formDataIncorrect = qs.stringify(postDataIncorrect);
    
    const resCorrect=await axios.post(`${baseURL}/login`,formDataCorrect,{ validateStatus() { return true },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      } });
    // console.log(resCorrect.data);
    expect(resCorrect.status).toBe(200);
    expect(resCorrect.data.token).toBeTruthy();
    token=resCorrect.data.token
    // console.log(token)
    
    const resIncorrect=await axios.post(`${baseURL}/login`,formDataIncorrect,{ validateStatus() { return true },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      } });
    expect(resIncorrect.status).toBe(401);
    expect(resIncorrect.data.token).toBeFalsy();
    // console.log(resIncorrect.data)
    
})

test('/post/location',async ()=>{
    const postDataCorrect={
        longitude:154,
        latitude:68
    };

    const postDataIncorrect={
        longitude:190,
    };
    const formDataCorrect = qs.stringify(postDataCorrect);
    const formDataIncorrect = qs.stringify(postDataIncorrect);
    const authToken=token;
    const resCorrect=await axios.post(`${baseURL}/location`,formDataCorrect,{ validateStatus() { return true },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${authToken}`
      } });

    const resIncorrect1=await axios.post(`${baseURL}/location`,formDataIncorrect,{ validateStatus() { return true },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': `Bearer ${authToken}`
      } });

      const resIncorrect2=await axios.post(`${baseURL}/location`,formDataCorrect,{ validateStatus:()=> { return true },
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          
        } });

        expect(resCorrect.status).toBe(200);
        expect (resIncorrect1.status).toBe(400);
        expect (resIncorrect2.status).toBe(401);
        // console.log(resIncorrect2);
        // console.log(resIncorrect2.data);

})

test('/get/closest',async ()=>{
    const postDataCorrect={
        longitude:154,
        latitude:68
    };

    const postDataIncorrect={
        longitude:190,
    };

    
    const resCorrect=await axios.get(`${baseURL}/closest`,{ params:postDataCorrect,validateStatus:()=> { return true } });
    const resIncorrect=await axios.get(`${baseURL}/closest`,{ params:postDataIncorrect,validateStatus:()=> { return true } });
   

      expect(resCorrect.status).toBe(200);
      expect(resIncorrect.status).toBe(400);
      expect(resCorrect.data.longitude).toBe(154);
      expect(resCorrect.data.latitude).toBe(68);


})