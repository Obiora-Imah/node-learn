const mission = process.argv[3];

if(mission === 'learn'){
    console.log('Time to write some code');
} else {
    console.log(`Is ${mission} really more fun than coding?`);
}