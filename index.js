
const axios = require('axios');
const URL = 'https://cat-fact.herokuapp.com/facts';

async function getCatsFacts(){

    const response = await axios.get(URL);
    const data = await response.data;
    
    return data; 
}

function returnFilteredAndUpdatedData(data){
    let updatedData = data.all.map((ele) => {
            if(ele.user){
                ele.user['fullName'] = `${ele.user.name.first}  ${ele.user.name.last}`;
                return ele;
            }
    });
    console.log(updatedData[0]);
    filterDataWithLessUpvotes(updatedData);
}

function filterDataWithLessUpvotes(data){
    let dataWithUpvotesGreaterThanTwo = [];
     dataWithUpvotesGreaterThanTwo = data.filter((ele) => {
        if(ele)
            return ele.upvotes >= 2;
    });

    for(let factsAndUpvotes of dataWithUpvotesGreaterThanTwo){
        console.log(`Fact : ${factsAndUpvotes.text} \nUpvotes : ${factsAndUpvotes.upvotes} \n\n\n`);
    }
}

const data = getCatsFacts()
    .then((data) => {
        //console.log(data.all[0]);
        returnFilteredAndUpdatedData(data);
    });

