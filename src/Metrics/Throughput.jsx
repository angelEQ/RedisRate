import React, { useContext } from 'react';
import AppContext from '../context/index';
import { Bar } from 'react-chartjs-2';
import '../styles/styles.css';

const Throughput = () => {

  const { 
    throughputData,
  } = useContext(AppContext);

  const state = {
    datasets: [
      {
        label: 'Connected Clients',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(0,0,0)',
        borderWidth: 2,
        data: [throughputData.connectedClients]
      },
      {
        label: 'Connected Replicas',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(0,0,0)',
        borderWidth: 2,
        data: [throughputData.connectedSlaves]
      },
      {
        label: 'Blocked Clients',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(0,0,0)',
        borderWidth: 2,
        data: [throughputData.blockedClients]
      }
    ]
  }

  return (
    <div id="throughputPage">
      <h3>Total Commands Processed: {throughputData.totalCommands}</h3>
      <Bar
        data={state}
        options={{
          legend:{
            display:true,
            position:'bottom'
          }
        }}
      />
    </div>
  )
}

export default Throughput;