async function saveReview(event) {
    event.preventDefault();
    const companyName = event.target.companyName.value;
    const pros = event.target.pros.value;
    const cons = event.target.cons.value;
    const rating = event.target.rating.value;

    const companyRating = {
        companyName,
        pros,
        cons,
        rating
    };
    console.log(companyRating);

    try {
        const res = await axios.post('http://localhost:3000/addReview',companyRating);
    } catch(err) {
        console.log(err);
    }
}

async function getReview(event) {
    event.preventDefault();
    const companyName = event.target.companyName.value;
    const res = await axios.get(`http://localhost:3000/getReview/${companyName}`);
    console.log(res.data.companyData);
    var flag = true;
    if(res.data.companyData.length<1){
        flag = false;
    }
    saveReviewPage(res.data.companyData,flag);
    //showReviews(review);



}

function saveReviewPage(review,flag) {
    if(flag === true) {
        const parent = document.getElementById('reviews');
        let avgRating = 0 ;

        parent.innerHTML = '';

        for(let i=0; i<review.length;i++){
            avgRating += review[i].rating;
            const child = `<li><b>Company Name:</b><br>${review[i].companyName}<br><b>Pros:</b><br>${review[i].pros}<br><b>Cons:</b><br>${review[i].cons}<br></li>`;
            parent.innerHTML = parent.innerHTML + child;

        }
        avgRating = avgRating / review.length;
        console.log(avgRating);
        const newChild = `<li><b>Average Rating:</b> ${avgRating}</li>`;
        parent.innerHTML = parent.innerHTML + newChild;
} else {
    const parent = document.getElementById('reviews');
    parent.innerHTML = ''
    const child = `<li><b>Company Not Found</b></li>`;
    parent.innerHTML = parent.innerHTML + child;
}
    



}