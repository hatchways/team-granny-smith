//this function compares the list of user following and followers (if they exist)
//and returns the users that follow the user but the user does not follow back and
//a list of users that should be excluded from our broader search so we dont't get
//any repititive data

const smartSearch = (userRelations, loggedInUserId) => {
	//this object is created to make the code more efficient in terms of time complexity
	let userFollowingList = {};

	//this is a list of people that follow the user but the user does not follow back
	let noFollowBack = [];

	//This is a list of ids that should be excluded when we want to search all the users
	let excludeFromSearch = [loggedInUserId];
	if (userRelations) {
		if (userRelations.following && userRelations.length) {
			userRelations.following.forEach((userId) => {
				userFollowingList[userId] = true;

				//we dont want the user following list to apear in the people you might know result
				excludeFromSearch.push(userId);
			});
		}

		if (userRelations.followers && userRelations.followers.length) {
			userRelations.followers.forEach((userData) => {
				if (!userFollowingList[userData._id]) {
					//followers that don't exist in the following list will be added to our noFollowBack list
					noFollowBack.push(userData);

					//since we added the users in the previous step we dont want them to apear in our broader search
					excludeFromSearch.push(userData._id);
				}
			});
		}
	}

	const result = { excludeFromSearch, noFollowBack };
	return result;
};

module.exports = smartSearch;
