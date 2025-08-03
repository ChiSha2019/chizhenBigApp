export interface Order {
  client: string;
  contact: string;
  modelReviewer: string;
  eventDate: string;
  eventTimeslot: {
    startTime: string;
    endTime: string;
  };
  eventAddress: {
    city: string;
    street: string;
  };
  pay: {
    agentCommission: string;
    modelPay: string;
  };
  targetHairStyleDescription: string;
  targetHairStylePhotos: string[];
  modelRequirements: string;
  eventDescription: string;
}

export const fetchOrders = async (): Promise<Order[]> => {
  // Stub data - replace with actual API call when server is ready
  return [
    {
      client: "施华蔻",
      contact: "娃娃",
      modelReviewer: "John Doe",
      eventDate: "2024-02-15",
      eventTimeslot: {
        startTime: "09:00",
        endTime: "17:00"
      },
      eventAddress: {
        city: "上海",
        street: "上海市静安区南京西路1000号"
      },
      pay: {
        agentCommission: "500",
        modelPay: "50-200"
      },
      targetHairStyleDescription: "头发长度在肩膀以上，颜色自然，适合拍摄时尚杂志",
      targetHairStylePhotos: ["photo1.jpg", "photo2.jpg"],
      modelRequirements: "	女性，年龄在18-30岁之间，身高160cm以上，形象气质佳",
      eventDescription: "施华蔻新产品发布会模特招募"
    },
    {
      client: "施华蔻",
      contact: "娃娃",
      modelReviewer: "John Doe",
      eventDate: "2024-02-15",
      eventTimeslot: {
        startTime: "09:00",
        endTime: "17:00"
      },
      eventAddress: {
        city: "上海",
        street: "上海市静安区南京西路1000号"
      },
      pay: {
        agentCommission: "500",
        modelPay: "50-200"
      },
      targetHairStyleDescription: "头发长度在肩膀以上，颜色自然，适合拍摄时尚杂志",
      targetHairStylePhotos: ["photo1.jpg", "photo2.jpg"],
      modelRequirements: "	女性，年龄在18-30岁之间，身高160cm以上，形象气质佳",
      eventDescription: "施华蔻新产品发布会模特招募"
    }
  ];
};