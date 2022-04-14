import axios from "axios";

const { REACT_APP_API_URL: API_URL } = process.env;
const headers = {
  ContentType: "application/json",
};

class APIService {
  async getAllParticipations() {
    try {
      const { data: participations } = await axios.get(API_URL, { headers });

      return participations;
    } catch (e) {
      console.error(e.message);
    }
  }

  async createParticipation(participationBody) {
    try {
      await axios.post(API_URL, participationBody, { headers });
    } catch (e) {
      console.error(e.message);
    }
  }

  async updateParticipation(participationId, participationBody) {
    try {
      await axios.put(`${API_URL}/${participationId}`, participationBody, {
        headers,
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  async deleteParticipation(participationId) {
    try {
      await axios.delete(`${API_URL}/${participationId}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}

export default new APIService();
