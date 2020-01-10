export default {
	getStart: function(stars) {
		var arr = []
		var num = Math.floor(stars / 2);
		var num_two = stars % 2;
		for (var i = 0; i < num; i++) {
			arr.push('/static/xingxing.png')
		}
		for (var i = 0; i < 5 - num; i++) {
			if (num_two >= 1) {
				arr.push('/static/banxingxing.png');
				num_two = 0;
			} else {
				arr.push('/static/huixingxing.png')
			}

		}
		return arr
	},
	newMovies: function(obj) {
		var moviesList = {
			title: obj.title,
			subjects: []
		}

		for (var index in obj.subjects) {
			var that = this;
			var movie = {
				title: obj.subjects[index].title,
				movieImg: 'https://images.weserv.nl/?url=' + obj.subjects[index].images.large,
				average: obj.subjects[index].rating.average,
				id: obj.subjects[index].id,
				arrstars: that.getStart(obj.subjects[index].rating.average),
			}
			moviesList.subjects.push(movie)
		}
		return moviesList
	}
}
