const { WebhookClient } = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Coupon = mongoose.model('coupon');
const Registration = mongoose.model('registration');



module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function Wikipedia(agent) {
            agent.add(`Welcome to my Msit fulfillment!`);
        }

        async function learn(agent) {
            Demand.findOne({'course': agent.parameters.courses}, function(err, course) {
                if (course !== null ) {
                    course.counter++;
                    course.save();
                } else {
                    const demand = new Demand({course: agent.parameters.courses});
                    demand.save();
                }
            });
            let responseText = `You want to learn about ${agent.parameters.courses}. 
                    Here is a link to all of my courses: https://www.geeksforgeeks.org`;
                let coupon = await Coupon.findOne({'course': agent.parameters.courses});
                if (coupon !== null ) {
                    responseText = `You want to learn about ${agent.parameters.courses}. 
                    Here is a link to the course: ${coupon.link}`;
                }
                agent.add(responseText);
            }
        
            async function registration(agent) {

                const registration = new Registration({
                    name: agent.parameters.name,
                    address: agent.parameters.address,
                    phone: agent.parameters.phone,
                    email: agent.parameters.email,
                    dateSent: Date.now()
                });
                try{
                    let reg = await registration.save();
                    console.log(reg);
                } catch (err){
                    console.log(err);
                }
            }


        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        

        intentMap.set('Wikipedia', Wikipedia);
        intentMap.set('Learncourses', learn);
        intentMap.set('Recommend Courses - yes', registration);

        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

} 