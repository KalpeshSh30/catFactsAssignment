
const axios = require('axios');
const URL = 'https://cat-fact.herokuapp.com/facts';

async function getCatsFacts(){
    try{
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    }
    catch(error){
        console.log(error.code);
    } 
}

function returnUpdatedData(data){
    const updatedData = data.all.map((ele) => {
            if(ele.user){
                ele.user['fullName'] = `${ele.user.name.first}  ${ele.user.name.last}`;
                return ele;
            }
    });
    return updatedData;
}

function filterDataWithLessUpvotes(data){
     const dataWithUpvotesGreaterThanTwo = data.filter((ele) => {
        if(ele)
            return ele.upvotes >= 2;
    });
    for(let factsAndUpvotes of dataWithUpvotesGreaterThanTwo){
        console.log(`Fact : ${factsAndUpvotes.text} \nUpvotes : ${factsAndUpvotes.upvotes} \n\n\n`);
    }
}
getCatsFacts()
    .then((data) => {
        const updatedData = returnUpdatedData(data);
        filterDataWithLessUpvotes(updatedData);
    });