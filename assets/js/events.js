export const events = [
  
    {
      url: "/events/announcements/2021/10/05/pag-xxix-21.html",
      title: "Plant and Animal Genome Conference XXIX, San Diego",
      date: "05 Oct 2021",
      unixDate: 1633392000,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "International Plant & Animal Genome Conference (PAG XXIX) 8-12 January, 2022, San Diego",
    },
  
    {
      url: "/events/announcements/2021/11/02/bic-napia-21.html",
      title: "BIC & NAPIA Biennial meeting, virtual",
      date: "02 Nov 2021",
      unixDate: 1635811200,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "BIC & NAPIA Biennial meeting will be held virtually, 2-4 November, 2021",
    },
  
    {
      url: "/events/announcements/2022/05/25/plantbio-22.html",
      title: "ASPB Annual Meeting, Portland, Oregon",
      date: "25 May 2022",
      unixDate: 1653436800,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "Plant Biology 2022 will be held July 9-13 in Portland, Oregon",
    },
  
    {
      url: "/events/announcements/2022/06/03/Soy2022.html",
      title: "Molecular and Cellular Biology of the Soybean (Soy2022), virtual",
      date: "03 Jun 2022",
      unixDate: 1654214400,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "Molecular and Cellular Biology of the Soybean (Soy2022) 22-23 August, 2022 (virtual)",
    },
  
    {
      url: "/events/announcements/2023/06/18/WSRC11-23.html",
      title: "World Soybean Research Conference (WSRC11), Vienna Austria",
      date: "18 Jun 2023",
      unixDate: 1687046400,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "World Soybean Research Conference (WSRC11), 18-23 June, 2023, Vienna Austria",
    },
  
    {
      url: "/events/announcements/2023/08/06/8ilc-23.html",
      title: "8th International Legume Conference, Brazil",
      date: "06 Aug 2023",
      unixDate: 1691280000,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "8th International Legume Conference, 6-11 August 2023, Pirenópolis, Brazil",
    },
  
    {
      url: "/events/announcements/2023/09/19/4ils-23.html",
      title: "Fourth International Legume Society Conference, Spain",
      date: "19 Sep 2023",
      unixDate: 1695081600,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "Fourth International Legume Society Conference, 19-22 September 2023, Granada, Spain",
    },
  
    {
      url: "/events/announcements/2023/10/16/19-aagb-23.html",
      title: "Advances in Arachis through Genomics and Biotechnology (AAGB), Huntsville, Alabama",
      date: "16 Oct 2023",
      unixDate: 1697414400,
      
      endDate: "26 Oct 2023",
      unixEndDate: 1698278400,
      
      summary: "12th International conference on Advances in Arachis through Genomics and Biotechnology (AAGB), 16-19 October 2023, Huntsville, Alabama",
    },
  
    {
      url: "/events/announcements/2023/11/06/bic-napia-23.html",
      title: "BIC & NAPIA Biennial meeting, South Carolina",
      date: "06 Nov 2023",
      unixDate: 1699228800,
      
      endDate: "15 Nov 2023",
      unixEndDate: 1700006400,
      
      summary: "Bean Improvement Cooperative and North American Pulse Improvement Association (BIC/NAPIA), 6-8 November 2023, at Clemson University, South Carolina",
    },
  
    {
      url: "/events/jekyll/pixyll/2024/06/03/CropsConf24.html",
      title: "Crops Conference 2024, Huntsville, AL",
      date: "03 Jun 2024",
      unixDate: 1717372800,
      
      endDate: "13 Jun 2024",
      unixEndDate: 1718236800,
      
      summary: "Crops Conference 2024. Improving Agriculture Through Genomics",
    },
  
    {
      url: "/events/jekyll/pixyll/2024/09/30/ICLGG-2024.html",
      title: "ICLGG(2024) Brisbane/Meanjin, AUSTRALIA",
      date: "30 Sep 2024",
      unixDate: 1727654400,
      
      endDate: null,
      unixEndDate: null,
      
      summary: "ICLGG 2024",
    },
  
    {
      url: "/events/2025/03/31/AGBT-Ag-2025.html",
      title: "AGBT-Ag 2025",
      date: "31 Mar 2025",
      unixDate: 1743379200,
      
      endDate: "02 Apr 2025",
      unixEndDate: 1743552000,
      
      summary: "Advances in Genome Biology and Technology Agricultural Meeting",
    },
  
    {
      url: "/events/2025/07/23/Soy2025.html",
      title: "Soy2025",
      date: "23 Jul 2025",
      unixDate: 1753228800,
      
      endDate: "26 Jul 2025",
      unixEndDate: 1753488000,
      
      summary: "19th Biennial Cellular and Molecular Biology of the Soybean Conference",
    },
  
    {
      url: "/events/2025/09/15/IFLRC-APC.html",
      title: "IFLRC-APC",
      date: "15 Sep 2025",
      unixDate: 1757894400,
      
      endDate: "19 Sep 2025",
      unixEndDate: 1758240000,
      
      summary: "8th International Food Legume Research Conference and 5th Australian Pulse Conference",
    },
  
  ];

/* separate current and upcoming events from past events */
const currentUnixDate = Math.floor(Date.now() / 1000);

export const upcomingEvents = events
  .filter((event) => event.unixDate >= currentUnixDate || event.unixEndDate >= currentUnixDate);

export const pastEvents = events
    .filter((event) => event.unixDate < currentUnixDate && event.unixEndDate < currentUnixDate);
