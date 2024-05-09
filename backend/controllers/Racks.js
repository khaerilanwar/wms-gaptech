
import Racks from "../models/RackModel.js";

// Fungsi untuk menentukan status rak berdasarkan jumlah terisi
const getRackStatus = (terisi, kapasitas) => {
  if (terisi === 0) {
    return "Kosong";
  } else if (terisi >= kapasitas) {
    return "Penuh";
  } else if (terisi >= kapasitas * 0.9) {
    return "Hampir Penuh";
  } else {
    return "Tersedia";
  }
};

// Fungsi untuk mendapatkan detail isi rak
export const getAllRack = async (req, res) => {
  try {
    const racks = await Racks.find();
    const allRack = racks.map((rack) => ({
      rak: rack.rak,
      kapasitas: rack.kapasitas,
      terisi: rack.terisi,
      status: getRackStatus(rack.terisi, rack.kapasitas),
      produk: rack.produk,
    }));
    res.status(200).json(allRack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getEmptyRacks = async (req, res) => {
    try {
      // Ambil rak yang kosong dari database
      const emptyRacksData = await Racks.find({ terisi: 0 });
  
      // Jika tidak ada rak yang kosong, kirimkan respons 404
      if (emptyRacksData.length === 0) {
        return res.status(404).json({ message: "Tidak ada posisi rak yang kosong" });
      }
  
      // Ambil daftar rak yang kosong
      const emptyRacks = emptyRacksData.map(rack => rack.rak);
  
      res.status(200).json(emptyRacks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const generateAllRacks = () => {
  const allRacks = [];
  for (let i = 1; i < 2; i++) { 
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 4; k++) {
        for (let l = 1; l <= 4; l++) {
          allRacks.push(`L${i}-${j}-${k}-${l}`);
        }
      }
    }
  }
  return allRacks;
};
