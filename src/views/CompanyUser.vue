<template>
  <div class="container">
    <button class="btn btn-primary" @click="fetchData">Fetch Data</button>

    <table class="table">
      <thead>
        <tr>
          <th>Company ID</th>
          <th>Name</th>
          <th>Domain</th>
          <th>SSID</th>
          <th>Broker</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="company in companies" :key="company.companyId">
          <td>{{ company.companyId }}</td>
          <td>{{ company.name }}</td>
          <td>{{ company.domain }}</td>
          <td>{{ company.ssid }}</td>
          <td>{{ company.broker }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const fetchData = async () => {
  try {
    const response = await fetch("https://localhost:7264/api/CompanyContoller", {
      method: "GET",
      withCredentials: true,
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  data() {
    return {
      companies: []
    }
  },
  methods: {
    async fetchData() {
      try {
        const data = await fetchData();
        this.companies = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.btn {
  margin-top: 20px;
  margin-bottom: 20px;
}

.table {
  margin: 0 auto;
}
</style>
