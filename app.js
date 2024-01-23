const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000; 
const axios = require('axios');

app.use(cors()); 
app.use(express.json()); 

app.listen(8000, () => {
  console.log('server is runing in  http://localhost:$'+port);
});

app.post('/calculate-route', async (req, res)=>{

    try{
        console.log(req.body);
        const {positions}= req.body;
        const startPosition = positions[0];
        const pickupPosition = positions[1];
        const deliveryPoint = positions[2];
        console.log('get fork data');
        const forkData = await axios.get('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f');
        console.log('construct fork data');
        const fork = constructFork(forkData.data);
        console.log('start dijkstra calculation');

        

        const resultPickup  = dijkstra(fork,startPosition,pickupPosition);
        const resultDelivery  = dijkstra(fork,pickupPosition,deliveryPoint);

        const routePickup = routeCalculated(resultPickup.predecessor,pickupPosition);
        const routeDelivery = routeCalculated(resultDelivery.predecessor,deliveryPoint);
        const totalTime =resultPickup.distances[pickupPosition]+resultDelivery.distances[deliveryPoint];
       const response = {
        route: routePickup+','+routeDelivery,
        timer: totalTime.toFixed(2),
       };
       console.log(response);

       res.json(response);

    }catch(error)
    {
        res.status(500).send('Error not possible calculate the route')
    }

});
module.exports =app;
function routeCalculated(predecessor,endPoint){

    const traversedArray = [];
    let actualNode = endPoint;
    
    while(predecessor[actualNode] !== null){
        traversedArray.push(actualNode);
        actualNode = predecessor[actualNode];
    }

    traversedArray.push(actualNode);

    return traversedArray.reverse();

}

function constructFork(forkData){
    const fork = {};

  Object.keys(forkData).forEach(node => {
    fork[node] = forkData[node];
  });
    return fork;

}



function dijkstra(fork,startPosition,endPosition){
    const distances = {};
    const visited = {};
    const predecessor = {};

    Object.keys(fork).forEach(node=> {
        distances[node] = Infinity;
        predecessor[node] = null;
    });

    distances[startPosition] = 0;

    let actual = startPosition;
    while(actual != null)
    {
        console.log(actual);
        console.log(fork[actual]);
        console.log(distances[actual]);
       
        if(actual === endPosition){
            break;
        }
        try{
        
            Object.keys(fork[actual]).forEach(nextNode =>{
                if(!visited[nextNode]){
                    const newDistance = distances[actual] + fork[actual][nextNode];
                    if(newDistance < distances[nextNode])
                    {
                        distances[nextNode] = newDistance;
                        predecessor[nextNode] = actual;
                    }
                }
            });
    
            visited[actual] = true;
    
           let shortTime=Infinity;
           actual = null;
           Object.keys(fork).forEach(node => {
            if(!visited[node] && distances[node] < shortTime){
                shortTime = distances[node];
                actual = node;
                    }
           });
          
            }catch(error)
            {
                return res.status(500).send(error) ; 
            }

    }

    return {distances,predecessor};
}
