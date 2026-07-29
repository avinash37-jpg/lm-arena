import React, { useCallback, useEffect, useState, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_VIDEO_IDS = [
  '1t_riyVqaWXySGGeSfKdZaZ4saBlJzy0w',
  '1zgMCzD9uBzAF3E66VkPNWDhYcrQispHV',
  '1snXiAAieHvEdaT1RBc84fw_VmM7wbdAJ',
  '1GAwJYP9874IgHysv5TLNbnnaadOg7mw2',
  '1qHXQIpJhWLgkwGxAtnMy-iJdkhKml1Gc',
  '1MifDmsawRkSMTnI9RU2W-X9ti4enXYEq',
  '1qgHY32fsJwloabpfw2QgcP-Wq0Zgq6Pk',
  '1a7Q_r9DH7VUoSLW_esmRT7Nk0WiBylIr',
  '140hcvbNPVywQzWmJ5ozs1J8-aRv7adGR',
  '1uE_O0lEPhakkXwgDfArW88MNWDDlkR11',
  '1UHsU8Zxow_CaXdKAxbjq5eSgOcHNF1c7',
  '1gcQ4TXAnL7VtXxoD0XYt3OClSAS2DEvp',
  '1UKEBsEdi48pOVf4CXlhuMWWG0_yMuelB',
  '1zz7x7qbhZ2u-sJOwslLZauSvtiTdy4X9',
  '1MiK05BQUitsd7RjUTDgC3zZGc_boQqCu',
  '1VsgjWp4B-OKrcPBjV9UMgH1cxf4e-xcJ',
  '1grzRCYf8d2SrchLiM_bayqsKKBcxt9Ov',
  '13Ls-DopsDrXwYfgNj1UpDon9Ga3n_VxZ',
  '1aBTC8oAfRX2wV1XxpRxY0XjbTEzm551f',
  '1MMYdgE6gsAEDFmz9MoF6GfrWu0JJzlPM',
  '12RqXRlPrFtfdUQeAeVO342Dd0euMQzhe',
  '1a2R7f3FX7MdZJd6eGU6FFA2UtLS3CQHr',
  '1gcdj4fq6KoM9Oben4ygwUSi1AvvEabTL',
  '1hX6pl8gR5JGClslCWkyl7qvKz0b8p8Mn',
  '13wjzNGMkhbtxa7ScNFgX7Er2ge7Q6cM_',
  '1jiCEladY5rlkuiJppFAhebkjX9Ww0ipe',
  '1CEifJFjkEk0iggg2c53RAKUYpP-QesKP',
  '1Q-lJlVhHocQntUwrKuab3GmmdE5B78sl',
  '1tXD4L_Q6t5i_IZecNG0-qJErUQpWi8hs',
  '1IANS31nrD945yReQ96ZlevmrGfKOlPbq',
  '1WWgnpTgBFWDbSvfl-ID6Kbn_LvqJ71sW',
  '1O9QtPgX6xPKGupdrMlcv0oqSOeCgDTsD',
  '16fJZ4HidgPTVeSRx7TzWSWhhjzKAzVEW',
  '1w-lRlvLuFFegYvuS_6-OQ4PMQx0dNVAT',
  '1bNZ0Fu6sfBkdQiEKlWcBhoWXzcmcpc0V',
  '1gglyf11BVi3UxpEY6vFuU3YMLBgmY1F1',
  '1ANbhSNNPaO2pEZ9yuWlRmHXy0Gtpl448',
  '1rFvUXobTbG5c-WJZvAs0oNgWbnk5hCiL',
  '1VcVwFLwJ2UcKpmjC0p61Xe3D7Axa3dQd',
  '1Elt_x-tVCFRieLYw0CFiTpHKotCfsInV',
  '1nI8D3OY3c4HKcnHM9imehvpC69ge0diK',
  '1XlYv_9JY2XHvDCqO4VX2LWjnHaWCkSyx',
  '1tFlkhErx0-FAJVVgl5UqZYGKl8MVHaM1',
  '1aXowOyNrN3xnsaz7xE6fs72NCrSrvaqd',
  '19FTYe1ZqbMktbk0WxFTH2eu43bHkME3c',
  '1a8uCsm2MTnPe1ibvyg-XTYuYPa9QVTF_',
  '1GmMhlnVbz7h-H9u7n0Xv6byTreNaSIH_',
  '1gcta9YLLTkrKwakoCfajih6MnYCGFuM2',
  '1lRs-tithxpScKkxd0pkV81l37AfersaG',
  '1xIE_eaoACfHRLhrzD9Y_7Hw6A2m8M2J2',
  '1q6fziB_KaW7OXWjdPa_QbZcjrSPC2joF',
  '1QLDMAQfAhngVJ6-CVjxE27DXCNTHExGg',
  '1i0NtmXnvPBtszFxchhCDu1woPEz9Ne5S',
  '1v48esxH9RYVunRe81Td9FErKdoBd__Bc',
  '1yihrtcHeJe-jv1W1xPwePAAwZeeZHmi8',
  '1pFV_2RG-Dn-VAr9o1PlrXJuSMjg1CKZq',
  '1p0OaumuNgjTemR9LGPpn-ICg81stVMXh',
  '1S1sQeRlOTbLGaf3H32UZF8Qsf-0kEa93',
  '1zh2F8pdcI2nLh3i5AUJ0VtQWvYFXtPvO',
  '11i_soGN3r8GDqOnPPL8smVPJDZmoaB_r',
  '1PONX9LG2OKLlGwqn_eRFOCdbFn0SvTSF',
  '1ianwPfxN15VwtkjQYRyZhIjexmEL3uFc',
  '1xVkAyQLJ7TPLPvpmGVCNpI_XCZNoa-bc',
  '1qDETpD1JmzStTf5ToOVKnXBE9gc04Idn',
  '16wVJFlGwMed_OKYO8cUFbePEtrGpXxlt',
  '1pPaLxX9rKSD_Rli2arHRrxTpBOgeMIEh',
  '1jQbKmf41eEH0_dS9f_7CSk9vJ66K_U-p',
  '12-kAeAe1KoTP3FyzPorsGtcEWJFe8-0G',
  '1eLCHVIC5XWR1zfDqNven1aBZgOl2GWA4',
  '1meP2mpAAufneHpb-7zbgfHeqcqmYEIp1',
  '1sNtUzD9VwtLIKPFR-HkGDPvH-52fZW18',
  '1jvD1OJD8agb3-vN7ICI0PZdLaJxPUAck',
  '1rZQxZuLNzDwovwY70aXUPXfV0x9tRJCM',
  '1zYQDJfGoaSmQiCSjH_eD1a1EBcDPHr3Q',
  '1ssjitxPTvmAdEo3NvQNIUpado6WPagIx',
  '1SHVtcUTM_exRHs2qts_xxcR7J_KinAna',
  '1hbAPplN4kwZYencEz2X3-dwcAsi62sLm',
  '17-rK9kCGoICd3EfVmsLENJDX-TU1Bhhx',
  '1HovBoK4TWlJDSwaLPdc0D6EcHlc4hPv_',
  '1MHoE3jdB5r2pDHJZPeAfomPINoaU4joJ',
  '131fqJ6M-04T7GlPZNudh-pXJUJvSMuM3',
  '1M-xghCarpuXf9v9Dd8_p0S88py6VtWik',
  '1FO_mrZNhtD7C169hIbwE_iOE00-aw2Ql',
  '1pByIPPnL2geBQh6BUlQJZOaYuw5Yr75m',
  '1aqqec6d2pa1yAg9Vt_vgIx5qpsQ9aPE-',
  '163-n4v4xiin5g5tv_rBQNqyT51-VuZFI',
  '1dqQP5jWKQIPdqvYORvpR2SonLFsElpju',
  '1kt0ktBMwZlcS79hnDM7nTzzemn9GjHco',
  '1n4IK82mi361qsOquunmcLN_vYWIzj6N8',
  '1dLrPH59jY7ZSjsy7YmBqCV_-QyC3VxU1',
  '1oGF-d4NOAx7ACQAqeK2iu46pUtH6y-6Q',
  '1l2H9F0NZ6D1cghUd2_IElpnkIek8RcI4',
  '12Pm-wNGBi4l0qS3vxvUbXRFQVBnmm6xO',
  '1nuQ_myMlPo2eDqdOVB-CnLRiWgMVHXj_',
  '1zuKiLlXnFF4nzr1yCYhVw7722J0dY3gU',
  '17Agb3nvlYJRRkOsO4ajFroLmhuooXYES',
  '14D7F6uMudjYrZRU0P2e7amSb1UJ_x4w3',
  '1hwK8B7g8sFY8isIzQL-mRN48J03zegmU',
  '1_UsbuRdTUG9idtcUDZMBuuyp91Ws9Big',
  '1zeLyzKVUw5f4A6quQKMHFm4Il4qB5bzD',
  '1HMJPFT_IpHyPj4ZaPm8dXmF1xzBURbL9',
  '12piwAuQzRSoGQdpH9V_5BuF8s7_LnN40',
  '1fSrS5hd8JQFB7G0efe6Mz1TcP3i8zLes',
  '18OmBBgJ5Ee3rsqrHHjZSUVLRVR9TMq07',
  '1yQSP6j4QEXV6drL4SicnjXXqNyNW0BJN',
  '1sOcuSAg5NC62MqMelBJFikC3nbY0fD8H',
  '1PDLBvwsI27UVjjnLk8ESb0QdgW8-4ySE',
  '1C5FrGM2AJYJQ1styoESx1B4Z23VABGti',
  '1Z2LixoDDK2kO-1lsvG1zRQ5sb1SiM-r-',
  '1DvQqvXYfHUIkLgbAuzFsyEARYkgLWMoZ',
  '14j00lXCN_6YmCLliQebAUjgSZJXQIgjr',
  '1zj66qUpki7dii_lthnlPVqojSKTXKPOA',
  '1pU23wBO3xIKpu8_7YVzKKJ-SWxofKmw9',
  '18dF3orJAAyOp-qBxTXyGMrvIcGWf0KC2',
  '1Euwu5isVYToDQ8rtuzKQgMONMEhC4olA',
  '1yaZpBSWRS-2rTAnkmjjib-mI8UpIgweH',
  '1h-227aoAtrTaekuGCN6s-ghTYyqAI5wQ',
  '1Ory_dedeZthMNTs1OrF1YjsukWbkijQx',
  '1eKR-ZKO0vy_665v5sIqbXOyM5B42aA4Q',
  '1ZbdTSO2zwcD9D_XlABOxaTCgTFd5uNUM',
  '1_r0AOvXZ_d9OOXVW-Sk3tzW7_TltNFvC',
  '1rMKqJRabikqAwEy48zPBuZvvzUZSWGEa',
  '1TMNGRJvY-hibXMCMvzQGo4DsElPKrp2o',
  '1omuDDmKifnObUdyzU-1M73vPyVYkanZ-',
  '1RRxsd4zl4DGwQFVS4ZBCEJ0KP0qZO70e',
  '1E_EkOp3e1DujtrsvpyuFTXXm5rzlJ5iK',
  '1tdbB6ROzFrkb6Md338YBWGSKHcI_FnKa',
  '1Ynpt1lsck2Tmnqdpw6_Lgbm_9PH-1Yto',
  '1fBI6GHPWr1hL-Ti05mM84inQO0iplw3v',
  '1_dWYbPj6jiehRxnfr0ctgWRMWCwY6BjQ',
  '1ppNB7cSlcquEzfk3_r9lRPrb3PG0UMrl',
  '1SKa1eFkRoapvLnFizn2JEzuzmryhDmDF',
  '1jFriGo8y9O7PphIMX_ah5ciPSE6ITehh',
  '1C-wE89G5MwwbSzaMsozR_GPIFXEN-Kx-',
  '1LeOGCmVTSMmxtFxaF4EPgE6RGlMQOKmo',
  '1Yagh92ADDnTQwy0kzEeQiizrCwzCIQmE',
  '1E4sPb9FR4R49tkdSSQDv5g-LAec9TiRI',
  '1yk92GEYD-50s-2I5F73q5DU2HRNbmMv1',
  '1HZDIELsoUjL2wS1mhhwhVXAEFgB0d8xO',
  '1yn804foegNGQjfNsV75ac1kvP52cSQIk',
  '1PtWzG64iC7ebo_nSNQ3vmNwT7ZKnJ3vj',
  '1pdd4AjL_3V60eSFCXxVl4Zb_G1cQ6mys',
  '108D_ucwOc4vSozcmTfkjwDwU3uLO0EI_',
  '16dLOjTZdNCWkPP_VU8icSxskvYnGOGN0',
  '1vPxS1b2P2YZV1XDkozOmNKHVby8ssVjX',
  '1_lax5luJmBovdbg6ZllgK0EIDWRt9c3C',
  '1IDkWtflpTRT9BrclwEyxDlE8R5ozFbCv',
  '1mtCxsE_6d_Nowz1wK3LMaYZ47BI_K-Hb',
  '1E1nvWXB09pSK_nBD8ByfICrWNVKRHnvO',
  '1yWIgiyPfhYIxdv2Z691k6uGXSsMHPf6X',
  '1NWvSqjgk3Ig-Y5pvO2EI5QYVl9caKoTV',
  '1JH8IMiO3_sBYMmEiSCAuNRSg-tynHATp',
  '15qMDrsRYUnRBCUJZBMtKloINes9sllZa',
  '10lhsn-CZ73EdTm31VG1DJB4c7zHhJa72',
  '1Y34FT4YQftpLnnTng31y372nCjwCsC77',
  '1POcWk4ToLGqzKBAWK6y6dexnmCgYmxhj',
  '1rHWSHvKRNxkRO5KyGfCjMpaO14Ztslgg',
  '1kUO80yCy_7OouOMB4wDy8-XQ_OWbGswi',
  '186tejdbkP17pMRQtIu9vZRCZBtBqP6EA',
  '1apVKOCa8PjgAHg-cSTjAlT2mwjay4PGo',
  '1pb6-kqXLYpRf9o7N_f2rEoz0jeBFsniB',
  '1zYbqm26QgiKsfPjJEmFRLSYRIqNKS3e5',
  '11sThpP8uxwkEromVZNBs_cyWmtkDzB9U',
  '1VxJZ8fEjaxIF_VlRLPek7zBc4k-ahf4h',
  '19caf87958NC_yKVtq9jDgFezxKRBTFbO',
  '1FiJf_HV8FVx5yS9fGeHl22g6S62BXtVK',
  '1Phx5-ycL7xCnm6eQ7NBYU-cVbKghHEqG',
  '13wVejalQ-ONVKO2QzFDUO6aCGShUyJnj',
  '1lNSZfTBJVSeWX766s0bD0tq3sGXk1U8d',
  '1kLI0HE2aeoD3JUAU1ETui5I-5GZ7TFln',
  '1uT5dFxHIZx1Q5ETYBds-OdFhaneotnck',
  '1gf9QNat9qu3EHb0p6MUpbE9NVm1vlIJT',
  '1U4R-8vwa-3urMxIqc44Rr5AADPR1LzmO',
  '1xhNdaZzYVquhNmvjl195j4vH8s1hgta0',
  '10CZLaRsPNRCLC_iyRLORXtaJZi37UnsE',
  '1QpvC_cnkryHR3b2JZPS6Y8TiOIEOCZaa',
  '1gOu9CTKxc7InoKFkgsRemY79O6d1B0x0',
  '1IBb8jM49VK5F0ViDzpPMFJP_3Z7fWdUd',
  '1pAoM4NWxfwrdpBbhq0GhwEo-JDTiXR2Y',
  '1CQ9_m5BzI0a1mwuUo5XHrYMMHm4MSOWZ',
  '110GsM7yAjVedOMTLW2fAw6i-p5WGQnnm',
  '10wLjcNZMwdosmHCNn1hg0G3TPHWiactY',
  '1D20DcIf52tkyeb-z2OqodnuvpA-1Vqa2',
  '1wDpAW8HxnqBrIIgenWySSZuxmhomYHlC',
  '1hiwyRFZn-d9gn9OdU6Cj8u7AvD_bPtUW',
  '15gv2CdmCWlm7E2c0vUV6SrWgTByYm2QB',
  '1PAraSoxqFNCUGZnKoQWZmvje3I3O8amO',
  '1pzIrTQXG1UO8Z6F-ZrthfeD1uNvW0EkW',
  '1dHIBTvSqLVb54zVU9-k0MeQG3ZKjgTq5',
  '1wxlE5MHFipeJ4mUKAfRjDwFzjtGmVWS9',
  '18zp6e2gPePSJm_xefRIAD8yjtEH2pq6l',
  '1iTWXHm0NP6SCM8Qxo7JAS_15egTts9l_',
  '1eHpHkLzSJtoPrTRtp-chvLnmnubNXeeS',
  '10hj5DOFCQC2KvPB8GD3rw4Gub3uSGxG3',
  '1a5Uk5_1sd_v_O5QZ0g_mwC0GL2ZJ0tbo',
  '1ecs4Yyjn-8LXoiaLXiGVaLVOsgHA7Gpn',
  '14UImZ7THrIHqpjpLDxsMaYdKInAqz2iW',
  '1CyM2qZKWDWuRVWTzVUV63OpHEjLMIdwz',
  '1fugBYWSzSD1rVUUzTbPCKokwVQOlfc3v',
  '1gOlROglP6cFm11XY8rSJoNwG8ORLKXq2',
  '15ftlqAvcfQOScATmyN-VWVLB-Vjqgg1r',
  '1l1IO-ZEzEFhRZWJrC8Aw3xDfAgsucJfj',
  '1pK6l0BEubWepbUKbzV7g8SxlNm-dkTWg',
  '1nEbr2mZ206cC2fY79SekULuUQ6xHZdys',
  '1Hrt3_d8Er42LJvWBZpyhLE5hQ0WubFWl',
  '1U-w9Wwm6GNqOXfcgU6sEVW9vt35_maq9',
  '1mP4_Eg4ESHXa8i96m_lhiZ8I32EgHvn1',
  '1Q1u-oas84h8hVsQkaX-V_caorisIeUNS',
  '1JlBBrTtf8CJDvDYS2YOrJFxLAjjwjjzO',
  '1A1THj06Pf4n7Hw3_HUzWK4oO1ju_vSdN',
  '1UIOH903L5e5COIZyMugcoaBiU4Ddg3hN',
  '1VXcDuQofnwQ3jmDPBxRS3cxKIAd2pj5F',
  '1cPDB0aPulHNT1OpdM_hsdkFQR_fm3MLt',
  '1RtifaeJR4wnrOJItTnrLA0RORY0wgQdz',
  '1NWFr8meCigUPfz0uaY9vd3Cv8hHRFPy9',
];

export default function VideoGallery() {
  const [validVideos, setValidVideos] = useState<string[]>(INITIAL_VIDEO_IDS);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const handleImageError = useCallback((id: string) => {
    setValidVideos(prev => prev.filter(v => v !== id));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [validVideos, emblaApi]);

  const videoChunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < validVideos.length; i += 3) {
      chunks.push(validVideos.slice(i, i + 3));
    }
    return chunks;
  }, [validVideos]);

  return (
    <section id="videos" className="py-24 bg-zinc-950 relative border-t border-red-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-red-500 font-bold tracking-widest uppercase mb-2 text-xs flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-red-600"></span>
            Highlights
            <span className="w-8 h-[1px] bg-red-600"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-4 font-serif tracking-wide">
            Video Gallery
          </h3>
          <p className="text-zinc-400 font-light text-base sm:text-lg">
            Experience the energy and atmosphere of Levernasia.
          </p>
        </motion.div>

        <div className="relative overflow-hidden mb-12">
          <div className="flex justify-end mb-4 gap-2">
            <button 
              onClick={scrollPrev} 
              disabled={!canScrollPrev}
              className="p-2.5 border border-red-600/30 rounded-lg hover:bg-red-950/40 disabled:opacity-40 transition-all bg-black/60"
            >
              <ChevronLeft size={20} className="text-red-400" />
            </button>
            <button 
              onClick={scrollNext} 
              disabled={!canScrollNext}
              className="p-2.5 border border-red-600/30 rounded-lg hover:bg-red-950/40 disabled:opacity-40 transition-all bg-black/60"
            >
              <ChevronRight size={20} className="text-red-400" />
            </button>
          </div>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {videoChunks.map((chunk, chunkIdx) => (
                <div key={chunkIdx} className="flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4 flex flex-col gap-4">
                  {chunk.map((id, idx) => (
                    <div 
                      key={id}
                      className="aspect-video bg-black rounded-xl overflow-hidden relative cursor-pointer group border border-red-600/30 hover:border-red-500 transition-all shadow-xl"
                      onClick={() => setSelectedVideo(id)}
                    >
                      <img loading="lazy" fetchPriority="low" 
                        src={`https://drive.google.com/thumbnail?id=${id}&sz=w800`}
                        alt={`Video thumbnail`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(id)}
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm group-hover:scale-110 transition-transform border border-white/40">
                          <Play size={22} className="ml-0.5 fill-white text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white font-bold tracking-wider uppercase text-xs drop-shadow-md font-serif">
                        Levernasia Moment {(chunkIdx * 3) + idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              Close (X)
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl shadow-black relative"
            >
              <iframe 
                src={`https://drive.google.com/file/d/${selectedVideo}/preview`} 
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
