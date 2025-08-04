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
      eventDate: "2025-08-04",
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
      modelRequirements: "女性，年龄在18-30岁之间，身高160cm以上，形象气质佳",
      eventDescription: "施华蔻新产品发布会模特招募"
    },
    {
      client: "LVMH集团",
      contact: "张经理",
      modelReviewer: "Sarah Chen",
      eventDate: "2025-08-05",
      eventTimeslot: {
        startTime: "14:00",
        endTime: "18:00"
      },
      eventAddress: {
        city: "北京",
        street: "北京市朝阳区建国门外大街1号"
      },
      pay: {
        agentCommission: "800",
        modelPay: "100-300"
      },
      targetHairStyleDescription: "长发，卷发，欧美风格",
      targetHairStylePhotos: ["lvmh1.jpg", "lvmh2.jpg", "lvmh3.jpg"],
      modelRequirements: "男性模特，年龄25-35岁，身高180cm以上，有奢侈品拍摄经验",
      eventDescription: "LVMH春季奢侈品广告拍摄"
    },
    {
      client: "阿迪达斯",
      contact: "李总",
      modelReviewer: "Mike Wang",
      eventDate: "2025-08-06",
      eventTimeslot: {
        startTime: "08:00",
        endTime: "16:00"
      },
      eventAddress: {
        city: "广州",
        street: "广州市天河区体育西路103号"
      },
      pay: {
        agentCommission: "600",
        modelPay: "80-250"
      },
      targetHairStyleDescription: "运动风格，短发或马尾",
      targetHairStylePhotos: ["adidas_sport1.jpg", "adidas_sport2.jpg"],
      modelRequirements: "运动型模特，男女不限，身材健美，有运动背景优先",
      eventDescription: "阿迪达斯新款运动鞋产品拍摄"
    },
    {
      client: "华为技术",
      contact: "王助理",
      modelReviewer: "Lisa Zhang",
      eventDate: "2025-08-07",
      eventTimeslot: {
        startTime: "10:00",
        endTime: "15:00"
      },
      eventAddress: {
        city: "深圳",
        street: "深圳市南山区华为总部"
      },
      pay: {
        agentCommission: "700",
        modelPay: "120-280"
      },
      targetHairStyleDescription: "简约现代，商务风格",
      targetHairStylePhotos: ["huawei_tech1.jpg"],
      modelRequirements: "商务模特，气质佳，适合科技产品代言",
      eventDescription: "华为新品发布会展示模特"
    },
    {
      client: "星巴克",
      contact: "Coffee Master",
      modelReviewer: "David Kim",
      eventDate: "2025-08-08",
      eventTimeslot: {
        startTime: "16:00",
        endTime: "20:00"
      },
      eventAddress: {
        city: "成都",
        street: "成都市锦江区太古里"
      },
      pay: {
        agentCommission: "400",
        modelPay: "60-180"
      },
      targetHairStyleDescription: "自然亲和，温馨风格",
      targetHairStylePhotos: ["starbucks1.jpg", "starbucks2.jpg"],
      modelRequirements: "亲和力强，适合咖啡文化展示",
      eventDescription: "星巴克秋季新品推广活动"
    },
    {
      client: "Tesla特斯拉",
      contact: "Elon Fan",
      modelReviewer: "Alex Chen",
      eventDate: "2025-08-10",
      eventTimeslot: {
        startTime: "12:00",
        endTime: "17:30"
      },
      eventAddress: {
        city: "杭州",
        street: "杭州市西湖区文三路"
      },
      pay: {
        agentCommission: "900",
        modelPay: "150-400"
      },
      targetHairStyleDescription: "前卫时尚，科技感强",
      targetHairStylePhotos: ["tesla_future1.jpg", "tesla_future2.jpg", "tesla_future3.jpg"],
      modelRequirements: "高端模特，形象突出，适合高科技产品展示",
      eventDescription: "Tesla新能源汽车展示活动"
    },
    {
      client: "香奈儿",
      contact: "Coco助手",
      modelReviewer: "Marie Chen",
      eventDate: "2025-08-04",
      eventTimeslot: {
        startTime: "15:00",
        endTime: "19:00"
      },
      eventAddress: {
        city: "上海",
        street: "上海市黄浦区淮海中路99号"
      },
      pay: {
        agentCommission: "1200",
        modelPay: "200-500"
      },
      targetHairStyleDescription: "优雅高贵，法式风情",
      targetHairStylePhotos: ["chanel1.jpg", "chanel2.jpg"],
      modelRequirements: "高端女性模特，气质优雅，有奢侈品拍摄经验",
      eventDescription: "香奈儿秋冬新品发布会"
    },
    {
      client: "小米科技",
      contact: "雷助理",
      modelReviewer: "Tony Liu",
      eventDate: "2025-08-09",
      eventTimeslot: {
        startTime: "11:00",
        endTime: "16:00"
      },
      eventAddress: {
        city: "北京",
        street: "北京市海淀区西二旗"
      },
      pay: {
        agentCommission: "650",
        modelPay: "100-250"
      },
      targetHairStyleDescription: "年轻活力，时尚简约",
      targetHairStylePhotos: ["xiaomi1.jpg"],
      modelRequirements: "年轻模特，20-28岁，适合科技产品代言",
      eventDescription: "小米新品手机发布活动"
    },
    {
      client: "耐克",
      contact: "Just Do It",
      modelReviewer: "Kevin Sport",
      eventDate: "2025-08-11",
      eventTimeslot: {
        startTime: "07:00",
        endTime: "14:00"
      },
      eventAddress: {
        city: "深圳",
        street: "深圳市福田区体育公园"
      },
      pay: {
        agentCommission: "750",
        modelPay: "120-300"
      },
      targetHairStyleDescription: "运动活力，健康阳光",
      targetHairStylePhotos: ["nike1.jpg", "nike2.jpg"],
      modelRequirements: "运动型模特，身材匀称，有运动背景",
      eventDescription: "耐克跑步系列产品拍摄"
    },
    {
      client: "宝马中国",
      contact: "BMW Manager",
      modelReviewer: "Hans Mueller",
      eventDate: "2025-08-15",
      eventTimeslot: {
        startTime: "13:00",
        endTime: "18:00"
      },
      eventAddress: {
        city: "苏州",
        street: "苏州工业园区星湖街"
      },
      pay: {
        agentCommission: "1000",
        modelPay: "180-450"
      },
      targetHairStyleDescription: "商务精英，德式严谨",
      targetHairStylePhotos: ["bmw1.jpg", "bmw2.jpg", "bmw3.jpg"],
      modelRequirements: "高端商务模特，气质成熟，适合豪车代言",
      eventDescription: "宝马新车型发布展示"
    }
  ];
};