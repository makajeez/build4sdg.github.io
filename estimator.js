// const sampData = { // test data for confirmation;
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'days',
//   timeToElapse: 58,
//   reportedCases: 647,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };

const covid19ImpactEstimator = (data) => {
  let factor;
  let timeUsed; // variables to be used;

  const iCurrentlyInfected = data.reportedCases * 10;
  const sCurrentlyInfected = data.reportedCases * 50;

  // logic for computing factor to calculate infectionByRequestedTime;
  if (data.periodType === 'months') {
    factor = Math.floor((data.timeToElapse * 30) / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((data.timeToElapse * 7) / 3);
  } else {
    factor = Math.floor(data.timeToElapse / 3);
  }

  const iInfectionsByRequestedTime = Math.trunc(iCurrentlyInfected * (2 ** factor));
  const sInfectionsByRequestedTime = Math.trunc(sCurrentlyInfected * (2 ** factor));
  // end of challenge 1;

  const iSevereCasesbyRequestedTime = Math.trunc(iInfectionsByRequestedTime * 0.15);
  const sSevereCasesbyRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.15);
  const iHospitalBedsByRequestedTime = Math.trunc((data.totalHospitalBeds * 0.35)
  - iSevereCasesbyRequestedTime);
  const sHospitalBedsByRequestedTime = Math.trunc((data.totalHospitalBeds * 0.35)
  - sSevereCasesbyRequestedTime);
  // end of challenge 2;

  const iCasesForICUByRequestedTime = Math.trunc(iInfectionsByRequestedTime * 0.05);
  const sCasesForICUByRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.05);
  const iCasesForVentilatorsByRequestedTime = Math.trunc(iInfectionsByRequestedTime * 0.02);
  const sCasesForVentilatorsByRequestedTime = Math.trunc(sInfectionsByRequestedTime * 0.02);

  // logic for computign timeUsed to calculate dollarsInFlight;
  if (data.periodType === 'months') {
    timeUsed = data.timeToElapse * 30;
  } else if (data.periodType === 'weeks') {
    timeUsed = data.timeToElapse * 7;
  } else {
    timeUsed = data.timeToElapse;
  }

  const iDollarsInFlight = Math.trunc(iInfectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD * timeUsed);
  const sDollarsInFlight = Math.trunc(sInfectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD * timeUsed);
    // eend of challenge 4;

  return {
    data,
    impact: {
      currentlyInfected: iCurrentlyInfected,
      infectionsByRequestedTime: iInfectionsByRequestedTime,
      severeCasesbyRequestedTime: iSevereCasesbyRequestedTime,
      hospitalBedsByRequestedTime: iHospitalBedsByRequestedTime,
      casesForICUByequestedTime: iCasesForICUByRequestedTime,
      casesForVentilatorsByequestedTime: iCasesForVentilatorsByRequestedTime,
      dollarsInFlight: iDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: sCurrentlyInfected,
      infectionsByRequestedTime: sInfectionsByRequestedTime,
      severeCasesbyRequestedTime: sSevereCasesbyRequestedTime,
      hospitalBedsByRequestedTime: sHospitalBedsByRequestedTime,
      casesForICUByequestedTime: sCasesForICUByRequestedTime,
      casesForVentilatorsByequestedTime: sCasesForVentilatorsByRequestedTime,
      dollarsInFlight: sDollarsInFlight
    }
  };
};
// console.log(result);
// covid19ImpactEstimator(sampData);
export default covid19ImpactEstimator;
