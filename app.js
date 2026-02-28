// Game State
let gameState = {
    score: 0,
    streak: 0,
    currentPair: 0,
    userAnswers: []
};

// Sample post data - replace with API calls later
const postPairs = [
    {
        id: 1,
        postA: {
            title: "My girlfriend asked me to choose between her and my best friend",
            content: "I've been dating my girlfriend for about 3 years now, and she's become a huge part of my life. My best friend and I have known each other since we were kids. Lately, my girlfriend has been expressing concerns about how much time I spend with him. She says she feels like he's always getting in the way of our relationship.\n\nLast night, things came to a head when she asked me to choose between her and him. I was shocked and didn't know what to say. My best friend is really important to me, but so is my relationship. I love my girlfriend, but I also can't imagine my life without my best friend.\n\nI'm completely torn. Has anyone else dealt with a similar situation? How did you handle it? I need some advice because I feel like whatever decision I make will hurt someone I care about deeply.",
            author: Math.floor(Math.random() * 99999),
            upvotes: 2300,
            comments: 523,
            type: "human"
        },
        postB: {
            title: "Need help dealing with trust issues in my relationship",
            content: "So like, my bf keeps texting this girl from his work and it's been bugging me. He says nothing is going on but I just get this feeling, you know? Like I can feel something off even though he hasn't really done anything wrong that I can prove.\n\nWe've been together for like 8 months and it's been really good but now I'm starting to wonder if I should just snoop through his phone to see what's really going on. I know that sounds crazy but I'm getting more and more anxious about it every day.\n\nMy friends say I should just ask him but I feel like if I do he'll just lie to me. I'm stuck between wanting to trust him but also feeling like I need to know what he's talking about with her. What should I do? Is it normal to feel this way or am I being paranoid? Any advice would help honestly.",
            author: Math.floor(Math.random() * 99999),
            upvotes: 1800,
            comments: 389,
            type: "human"
        }
    },
    {
        id: 2,
        postA: {
            title: "My partner doesn't respect my boundaries and I don't know what to do",
            content: "I find myself in a situation where my partner consistently overlooks the boundaries I've established. When I communicate my needs, they often dismiss them or claim I'm being unreasonable. This pattern has been occurring for several months now, and I'm beginning to question whether the relationship is healthy.\n\nI value their company and we have positive moments, but the recurring violation of my stated boundaries is causing me significant emotional distress. I've attempted direct conversation, but these discussions typically result in defensive responses rather than constructive dialogue.\n\nI'm uncertain about the best course of action. Should I continue attempting to reinforce these boundaries, seek couples counseling, or reconsider the future of this relationship? I would appreciate thoughtful perspectives from individuals who may have navigated similar circumstances.",
            author: Math.floor(Math.random() * 99999),
            upvotes: 3100,
            comments: 678,
            type: "ai"
        },
        postB: {
            title: "She keeps bringing up her ex and it's driving me crazy",
            content: "Okay so my gf is always talking about her ex. Like we'll be watching a movie and she'll be like 'oh that's what me and [ex's name] used to do' or we'll be at a restaurant and she'll mention how her ex took her there. It happens all the time and honestly it's really bothering me.\n\nWhen I said something about it she got defensive and said I'm being insecure and immature. Maybe I am being insecure but like... why does she need to keep bringing him up? We've been together for almost a year and I feel like she should have moved on completely by now.\n\nHow do I bring this up without sounding like a jealous psycho? Or am I actually being unreasonable here?",
            author: Math.floor(Math.random() * 99999),
            upvotes: 2100,
            comments: 445,
            type: "human"
        }
    },
    {
        id: 3,
        postA: {
            title: "Looking for advice on maintaining emotional intimacy",
            content: "My partner and I have been together for five years, and while our physical relationship remains satisfying, I've noticed a gradual decline in our emotional connection. We used to spend hours talking about our dreams, fears, and aspirations, but lately our conversations have become more transactional and superficial.\n\nI believe this shift has coincided with increased work stress for both of us. I wonder if this is a natural phase in long-term relationships or if there are specific strategies we could employ to rebuild this aspect of our connection. I'm particularly interested in hearing about methods that have been effective for others.",
            author: Math.floor(Math.random() * 99999),
            upvotes: 1950,
            comments: 512,
            type: "ai"
        },
        postB: {
            title: "My boyfriend never wants to talk about feelings",
            content: "I've been with my boyfriend for 2 years and one of the biggest issues is that he literally will not have conversations about emotions or feelings. Like if I try to talk about something that's bothering me or something I'm worried about, he just shuts down and changes the subject.\n\nIt makes me feel like he doesn't care about how I'm feeling or what's going on in my head. I've tried everything - I've been nice about it, I've been direct, I've cried, I've gotten angry. Nothing works. He just gets uncomfortable and walks away.\n\nI love him and he's a great guy in other ways but this is making me feel so alone. Is this something that can change or is he just like this? Should I even stay in this relationship?",
            author: Math.floor(Math.random() * 99999),
            upvotes: 2750,
            comments: 609,
            type: "human"
        }
    }
];

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    loadPair(gameState.currentPair);
});

// Load a new pair of posts
function loadPair(pairIndex) {
    if (pairIndex >= postPairs.length) {
        pairIndex = 0;
    }

    const pair = postPairs[pairIndex];
    
    // Update Post A
    document.getElementById('titleA').textContent = pair.postA.title;
    document.getElementById('contentA').textContent = pair.postA.content;
    document.getElementById('authorA').textContent = pair.postA.author;
    
    // Update Post B
    document.getElementById('titleB').textContent = pair.postB.title;
    document.getElementById('contentB').textContent = pair.postB.content;
    document.getElementById('authorB').textContent = pair.postB.author;
    
    // Reset button states
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    gameState.currentPair = pairIndex;
}

// Handle post selection
function selectPost(post, selection) {
    const pair = postPairs[gameState.currentPair];
    const correctType = post === 'A' ? pair.postA.type : pair.postB.type;
    const otherPost = post === 'A' ? 'B' : 'A';
    const otherCorrectType = otherPost === 'A' ? pair.postA.type : pair.postB.type;
    
    // Check if answer is correct
    const isCorrect = selection === correctType;
    
    // Update score
    if (isCorrect) {
        gameState.score += 10;
        gameState.streak += 1;
    } else {
        gameState.streak = 0;
    }
    
    // Update UI
    updateStats();
    
    // Show result modal
    showResult(isCorrect, post, selection, correctType, otherCorrectType);
    
    // Disable buttons
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.disabled = true;
    });
}

// Show result modal
function showResult(isCorrect, selectedPost, selectedType, correctType, otherCorrectType) {
    const modal = document.getElementById('resultModal');
    const overlay = document.getElementById('resultOverlay');
    const title = document.getElementById('resultTitle');
    const message = document.getElementById('resultMessage');
    const resultA = document.getElementById('resultA');
    const resultB = document.getElementById('resultB');
    
    const pair = postPairs[gameState.currentPair];
    const postAType = pair.postA.type === 'human' ? 'Human Written' : 'AI Written';
    const postBType = pair.postB.type === 'human' ? 'Human Written' : 'AI Written';
    
    if (isCorrect) {
        title.textContent = '✓ Correct!';
        title.style.color = '#818384';
        message.textContent = `Great job! You correctly identified Post ${selectedPost} as ${selectedType === 'human' ? 'human-written' : 'AI-written'}.`;
    } else {
        title.textContent = '✗ Incorrect';
        title.style.color = '#d7dadc';
        message.textContent = `Oops! Post ${selectedPost} was actually ${correctType === 'human' ? 'human-written' : 'AI-written'}, not ${selectedType === 'human' ? 'human-written' : 'AI-written'}.`;
    }
    
    resultA.textContent = postAType;
    resultB.textContent = postBType;
    
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('resultModal').classList.add('hidden');
    document.getElementById('resultOverlay').classList.add('hidden');
}

// Load next pair
function loadNextPair() {
    closeModal();
    gameState.currentPair += 1;
    
    if (gameState.currentPair >= postPairs.length) {
        gameState.currentPair = 0;
    }
    
    loadPair(gameState.currentPair);
    
    // Re-enable buttons
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.disabled = false;
    });
}

// Update statistics display
function updateStats() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('streak').textContent = gameState.streak;
}