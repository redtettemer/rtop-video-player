// all things youtube

const youtube = {
	isYoutube(url) {
		return (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(url));
	}
}

export default youtube;
